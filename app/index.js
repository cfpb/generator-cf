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

// Set list of repos from which we grab standard files.
// These will be used in the downloadTemplate function in the writing priority.
var osLibraries = [
  'https://github.com/cfpb/open-source-project-template/archive/master.zip',
  'https://github.com/cfpb/front-end/archive/master.zip'
];

// Grab a list of all CF components, we'll use it later.
var components = request({
  uri: 'https://api.github.com/search/repositories?q=%22cf-%22+NOT+cfpb+NOT+cfgov+NOT+deprecated+NOT+generator+user:cfpb+language:JavaScript+language:css+language:html',
  json: true,
  headers: {'user-agent': 'generator-cf'}
}).then( filterComponents ).catch( console.error );

var manifestCheck = function() {
  try {
    var manifest = require(path.join(process.cwd(), 'package.json'));

    return manifest;
  } catch(e) {};
};

var CapitalFrameworkGenerator = yeoman.generators.Base.extend({

  initializing: {

    greet: function() {
      this.pkg = require('../package.json');
      this.existing = manifestCheck();

      banner();
      this.log(
        '\nWelcome to the Capital Framework generator, brought\n' +
        'to you by the ' + chalk.green('Consumer Financial Proection Bureau') + '.'
      );
      this.log('\nTo learn about Capital Framework, visit ' + chalk.bold('capitalframework.com') + '.\n');
    }

  },

  prompting: {

    askForName: function() {
      var done = this.async();

      this.prompt({
        name: 'name',
        message: 'What is the name of your project?',
        default: this._.humanize( this.existing && this.existing.name || path.basename(process.cwd()) ),
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
        message: 'Project\'s description',
        default: this.existing && this.existing.description || 'The best website ever.'
      }, {
        name: 'homepage',
        message: 'Project\'s homepage',
        default: this.existing && this.existing.homepage || 'http://www.consumerfinance.gov/'
      }, {
        name: 'license',
        message: 'Project\'s license',
        default: this.existing && this.existing.license || 'CC0'
      }, {
        name: 'repoType',
        message: 'Repository type',
        default: this.existing && this.existing.repository && this.existing.repository.type || 'git'
      }, {
        name: 'repoUrl',
        message: 'Repository URL',
        default: this.existing && this.existing.repository && this.existing.repository.url || 'https://github.com/cfpb/capital-framework.git'
      }, {
        name: 'authorName',
        message: 'Author\'s name',
        default: this.existing && this.existing.author && this.existing.author.name || 'Consumer Financial Protection Bureau'
      }, {
        name: 'authorEmail',
        message: 'Author\'s email',
        default: this.existing && this.existing.author && this.existing.author.email || 'tech@cfpb.gov'
      }, {
        name: 'authorUrl',
        message: 'Author\'s homepage',
        default: this.existing && this.existing.author && this.existing.author.url || 'https://cfpb.github.io/'
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
          message: 'You’re about to install CF Core. Which additional CF components would you like in your app?',
          choices: components,
          default: components.map( function( c ) {
            return c.value;
          })
        }, function ( answers ) {
          var versionedComponents = this.components = [];

          // Get latest repo tag
          var getLatest = function( repo ) {
            request({
              uri: 'https://api.github.com/repos/cfpb/' + repo + '/tags',
              json: true,
              headers: { 'user-agent': 'generator-cf'}
            }, function( err, res, data ) {
              versionedComponents.push({ 'name': repo, 'ver': data[0].name });
            }).catch( console.error );
          };

          answers.components.push('cf-core');

          answers.components.forEach( function(el) {
            getLatest(el);
          });
          done();
        }.bind(this));
      }.bind(this));
    }

  },

  writing: {

    downloadTemplate: function() {
      var numLibraries = osLibraries.length;
      var done = this._.after( numLibraries, this.async() );

      osLibraries.forEach(function (library) {
        this.extract(library, '_cache', done);
      }.bind(this));
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

      // Copy files from the front-end repo.
      var feFiles = ['.eslintrc'];
      feFiles.forEach( function _copy( file ) {
        fs.createReadStream( this.destinationRoot() + '/_cache/front-end-master/' + file )
          .pipe( fs.createWriteStream(file) );
      }.bind(this));

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.copy('bowerrc', '.bowerrc');
    },

    srcFiles: function() {
      this.mkdir('src');
      this.directory('src/static', 'src/static');
      this.template('src/index.html', 'src/index.html');
      this.template('src/static/css/main.less', 'src/static/css/main.less');
      this.copy('src/index.html', 'src/index.html');
      this.mkdir('dist');
    },

    processReadme: function() {
        // The README that comes from OSPT doesn't include template variables so
        // we have to manually regex what we want out of it.
        var readme = this.readFileAsString( this.destinationRoot() + '/_cache/open-source-project-template-master/README.md'),
            projectText = '# ' + this.humanName + '\r\n\r\n' + this.props.description + '\r\n\r\n![Screenshot](screenshot.png)';
        // Remove everything at the screenshot line and above.
        // ([\s\S.]*) selects everything before the end of the line that ends with screenshot.png)
        readme = readme.replace( /([\s\S.]*)screenshot\.png\)/ig, projectText );
        // If this isn't a public domain project, remove all the licensing info
        // from the bottom of the README.
        if ( this.props.license !== 'CC0' ) {
          readme = readme.replace(/([\s\n\r]*)## Open source licensing info([\s\S]*)/ig, '');
        }
        this.writeFileFromString( readme, 'README.md' );
    },

    processGitIgnore: function() {
        var gitignore = this.readFileAsString( this.destinationRoot() + '/_cache/open-source-project-template-master/.gitignore'),
            done = this.async();
        // Add src/vendor to the end.
        gitignore = gitignore + '\r\nsrc/vendor/';
        this.writeFileFromString( gitignore, '.gitignore' );
        // Kill the _cache dir.
        rimraf( this.destinationRoot() + '/_cache', done );
    }

  },

  install: {

    installComponents: function() {

      if ( this.options['skip-install'] ) return;

      var done = this._.after( 2, this.async() );

      this.npmInstall( '', {}, done );

    }

  },

  end: {

    bye: function(){
      this.log( yosay('All done! Edit the files in the src directory and then `grunt build` to compile everything into the dist directory.') );
    }

  }


});

module.exports = CapitalFrameworkGenerator;
