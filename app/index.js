'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var multiline = require('multiline');

var CapitalFrameworkGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();
    var log = this.log;

    var welcome = this.yeoman + multiline.stripIndent(function () {/*
      Welcome to Capital Framework's generator!

      To learn about Capital Framework, visit https://cfpb.github.io/capital-framework/
    */});

    log( welcome );

    var prompts = [{
      type: 'list',
      name: 'components',
      message: 'Which CF components would you like in your app?',
      choices: [
        { name: 'Buttons', value: 'buttons' },
        { name: 'Colors', value: 'colors' },
        { name: 'Expandables', value: 'expandables' },
        { name: 'Forms', value: 'forms' },
        { name: 'Grid', value: 'grid' },
        { name: 'Icons', value: 'icons' },
        { name: 'Pagination', value: 'pagination' },
        { name: 'Typography', value: 'typography' },
      ],
      default: true
    }];

    this.prompt(prompts, function ( props ) {
      this.slug = this._.slugify( props.type );
      done();
    }.bind(this));
  },

  jquery: function source() {

    // src files
    this.mkdir('src');
    this.copy('jquery-plugin/src/jshintrc', 'src/.jshintrc');
    this.template('jquery-plugin/src/name.js', 'src/' + this.slug + '.js');

    // test files
    this.mkdir('test');
    this.copy('jquery-plugin/test/jshintrc', 'test/.jshintrc');
    this.template('jquery-plugin/test/name_test.js', 'test/' + this.slug + '_test.js');
    this.template('jquery-plugin/test/name.html', 'test/' + this.slug + '.html');

    // general files
    this.copy('jquery-plugin/jshintrc', '.jshintrc');
    this.copy('jquery-plugin/gitignore', '.gitignore');
    this.copy('jquery-plugin/travis.yml', '.travis.yml');
    this.template('jquery-plugin/Gruntfile.js', 'Gruntfile.js');
    this.template('jquery-plugin/_bower.json', 'bower.json');
    this.template('jquery-plugin/_package.json', 'package.json');

  }
});

module.exports = CapitalFrameworkGenerator;
