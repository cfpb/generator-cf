/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var rimraf = require('rimraf');

describe('cf generator', function () {
  this.timeout(10000);

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.app = helpers.createGenerator('cf:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  afterEach(function (done) {
    rimraf(path.join(__dirname, 'temp'), done);
  });

  it('creates expected files when run', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.bowerrc',
      '.eslintrc',
      '.gitignore',
      'bower.json',
      'package.json'
    ];
    helpers.mockPrompt(this.app, {
      'buildToolChoice': 'grunt'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates a gruntfile when Grunt is selected', function (done) {
    var expected = [
      'Gruntfile.js'
    ];
    helpers.mockPrompt(this.app, {
      'buildToolChoice': 'grunt'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates a gulpfile when Gulp is selected', function (done) {
    var expected = [
      'gulpfile.js'
    ];
    helpers.mockPrompt(this.app, {
      'buildToolChoice': 'gulp'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

});
