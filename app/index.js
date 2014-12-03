'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var chalk = require('chalk');
var banner = require('./banner');
var request = require('request-promise');
var filterComponents = require('./lib/filter-components');
var updateNotifier = require('./lib/notifier');
var fs = require('fs');
var rimraf = require('rimraf');

// Alert the user if a newer version of this generator is available.
updateNotifier();

// Grab a list of all CF components, we'll use it later.
var components = request({
  uri: 'https://api.github.com/orgs/cfpb/repos?per_page=100',
  json: true,
  headers: {'user-agent': 'generator-cf'}
}).then( filterComponents ).catch( console.error );

var CapitalFrameworkGenerator = yeoman.generators.Base.extend({

  initializing: {

    greet: function() {
      this.pkg = require('../package.json');
      banner();
      this.log('\nTo learn about Capital Framework, visit ' + chalk.bold('http://capitalframework.com') + '\n');
    }

  },

  prompting: {

    askForName: function() {
      var done = this.async();
      this.prompt({
        name: 'name',
        message: 'What is the name of your project?',
        default: this._.humanize( path.basename(process.cwd()) ),
      }, function( answers ) {
        this.humanName = answers.name;
        this.slugname = this._.slugify( answers.name );
        this.safeSlugname = this.slugname.replace( /-+([a-zA-Z0-9])/g, function ( g ) {
            return ' ' + g[1].toUpperCase();
          }
        );
        done();
      }.bind(this));
    },

    askForDescription: function() {
      var done = this.async();
      var prompts = [{
        name: 'description',
        message: 'Description',
        default: 'The best website ever.'
      }, {
        name: 'homepage',
        message: 'Project\'s homepage',
        default: 'http://consumerfinance.gov'
      }, {
        name: 'license',
        message: 'Project\'s License',
        default: 'CC0'
      }, {
        name: 'authorName',
        message: 'Author\'s name',
        default: 'Consumer Financial Protection Bureau'
      }, {
        name: 'authorEmail',
        message: 'Author\'s email',
        default: 'tech@cfpb.gov'
      }, {
        name: 'authorUrl',
        message: 'Author\'s homepage',
        default: 'http://consumerfinance.gov'
      }];
      this.prompt(prompts, function ( answers ) {
        this.currentYear = ( new Date() ).getFullYear();
        this.props = answers;
        done();
      }.bind( this ));
    },

    askAboutComponents: function() {
      var done = this.async();
      components.then( function( components ) {
        this.prompt({
          type: 'checkbox',
          name: 'components',
          message: 'Which CF components would you like in your app?',
          choices: components,
          default: components.map( function( c ) {
            return c.value;
          })
        }, function ( answers ) {
          this.components = answers.components;
          done();
        }.bind(this));
      }.bind(this));
    }

  },

  writing: {

    downloadTemplate: function() {
      var done = this.async();
      this.extract('https://github.com/cfpb/open-source-project-template/archive/master.zip', '_cache', done);
    },

    appFiles: function() {
      var files = ['screenshot.png', 'CHANGELOG.md'];

      // If this is a public domain project, grab some more files from OSPT.
      if ( this.props.license === 'CC0' ) {
        files = files.concat(['TERMS.md', 'CONTRIBUTING.md', 'LICENSE']);
      }

      // Copy over the OSPT files.
      files.forEach( function _copy( file ) {
        fs.createReadStream( this.destinationRoot() + '/_cache/open-source-project-template-master/' + file )
          .pipe( fs.createWriteStream(file) );
      }.bind(this));

      // this.template('_README.md', 'README.md');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.copy('bowerrc', '.bowerrc');
      this.copy('gitignore', '.gitignore');
    },

    srcFiles: function() {
      this.mkdir('src');
      this.directory('src/static', 'src/static');
      this.template('src/index.html', 'src/index.html');
      this.template('src/static/css/main.less', 'src/static/css/main.less');
      this.copy('src/index.html', 'src/index.html');
      this.mkdir('dist');
    },

  },

  install: {

    templateAppFiles: function() {
        // The README that comes from OSPT doesn't include template variables so
        // we have to manually regex what we want out of it.
        var readme = this.readFileAsString( this.destinationRoot() + '/_cache/open-source-project-template-master/README.md'),
            projectText = '# ' + this.humanName + '\r\n\r\n' + this.props.description + '\r\n\r\n![Screenshot](screenshot.png)',
            done = this.async();
        // Remove everything at the screenshot line and above.
        // ([\s\S.]*) selects everything before the end of the line that ends with screenshot.png)
        readme = readme.replace( /([\s\S.]*)screenshot\.png\)/ig, projectText );
        // If this isn't a public domain project, remove all the licensing info 
        // from the bottom of the README.
        if ( this.props.license !== 'CC0' ) {
          readme = readme.replace(/([\s\n\r]*)## Open source licensing info([\s\S]*)/ig, '');
        }
        this.writeFileFromString( readme, 'README.md' );
        // Kill the _cache dir.
        rimraf( this.destinationRoot() + '/_cache', done );
    },

    installComponents: function() {

      if ( this.options['skip-install'] ) return;

      var done = this._.after( 2, this.async() );

      this.npmInstall( '', {}, done );
      this.bowerInstall( this.components, {'save': true}, done );

    }

  },

  end: {

    bye: function(){
      this.log( yosay('All done! Edit the files in the src directory and then `grunt build` to compile everything into the dist directory.') );
    }

  }


});

module.exports = CapitalFrameworkGenerator;