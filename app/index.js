'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var multiline = require('multiline');

var CapitalFrameworkGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  promptTask: function () {

    var done = this.async();

    // Have Yeoman greet the user.
    this.log( yosay("Welcome to Capital Framework's generator!") );

    this.log( 'To learn about Capital Framework, visit https://cfpb.github.io/capital-framework/' );

    this.prompt({
      type: 'checkbox',
      name: 'components',
      message: 'Which CF components would you like in your app?',
      choices: [
        { name: 'Core', value: 'core' },
        { name: 'Buttons', value: 'buttons' },
        { name: 'Expandables', value: 'expandables' },
        { name: 'Forms', value: 'forms' },
        { name: 'Grid', value: 'grid' },
        { name: 'Icons', value: 'icons' },
        { name: 'Pagination', value: 'pagination' },
      ],
      default: true
    }, function ( answers ) {
      // Copy over bower.json before installing stuff.
      this.bulkCopy('bower.json', 'bower.json');
      // Install the components. This is probably installing them in the wrong
      // dir since we actually want to use `grunt vendor`. The nice thing about
      // bowerInstall is that it's writing the dependencies to bower.json. Maybe
      // we can copy the components to the correct directory about bowerInstall
      // completes?
      answers.components.forEach(function( component ) {
        this.bowerInstall([ 'cfpb/cf-' + component ], { 'save': true });
      }.bind(this));
      done();
    }.bind(this));
  },

  generic: function source() {

    // This is a really unexhaustive list and the files aren't even correct. For
    // now they're basically just placeholders.
    this.copy('bowerrc', '.bowerrc');
    this.copy('COPYING.txt', 'COPYING.txt');
    this.copy('gitignore', '.gitignore');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('package.json', 'package.json');
    this.copy('README.md', 'README.md');
    this.copy('TERMS.md', 'TERMS.md');

  }
});

module.exports = CapitalFrameworkGenerator;
