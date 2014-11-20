'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var chalk = require('chalk');
var banner = require('./banner');
var request = require('request-promise');
var filterComponents = require('./lib/filter-components');

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
          choices: components
        }, function ( answers ) {
          this.components = answers.components;
          done();
        }.bind(this));
      }.bind(this));
    }

  },

  writing: {

    appFiles: function() {
      this.template('_README.md', 'README.md');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.copy('Gruntfile.js', 'Gruntfile.js');
      this.copy('bowerrc', '.bowerrc');
      this.copy('gitignore', '.gitignore');
      this.copy('screenshot.png', 'screenshot.png');
      this.copy('CHANGELOG.md', 'CHANGELOG.md');
    },

    srcFiles: function() {
      this.mkdir('src');
      this.directory('src/static', 'src/static');
      this.copy('src/index.html', 'src/index.html');
      this.mkdir('dist');
    },

  },

  install: function() {

    if ( this.options['skip-install'] ) return;

    var done = this._.after( 2, this.async() );

    this.npmInstall( '', {}, done );
    this.bowerInstall( this.components, {'save': true}, done );

  },

  end: {

    bye: function(){
      this.log( yosay('All done! Edit the files in the src directory and then `grunt build` to compile everything into the dist directory.') );
    }

  }


});

module.exports = CapitalFrameworkGenerator;