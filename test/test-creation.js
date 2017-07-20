/*global describe, beforeEach, it */
'use strict';

const path = require( 'path' );
const helpers = require( 'yeoman-test' );
const assert = require( 'yeoman-assert' );

describe('cf generator', function () {
  this.timeout(10000);

  beforeEach( () => {
    this.generator = helpers.run( path.join( __dirname, '../app' ) );
  } );

  afterEach( () => {
    this.generator.cleanTestDirectory();
  })

  it( 'creates expected files when run', () => {
    return this.generator
      .then( () => {
        const expected = [
          // add files you expect to exist here.
          '.eslintrc',
          '.gitignore',
          'package.json'
        ];
        assert.file( expected );
      } )
  } );

  it( 'creates expected files when run', () => {
    return this.generator
      .withOptions( { 'skip-install': true } )
      .then( () => {
        const expected = [
          // add files you expect to exist here.
          '.eslintrc',
          '.gitignore',
          'package.json'
        ];
        assert.file( expected );
      } )
  } );

  it('creates a gruntfile when Grunt is selected', () => {
    return this.generator
      .withOptions( { 'skip-install': true } )
      .withPrompts( { buildToolChoice: 'grunt' } )
      .then( () => {
        const expected = [ 'Gruntfile.js' ];
        assert.file( expected );
      } )
  });

  it('creates a gulpfile when Gulp is selected', () => {
    return this.generator
      .withOptions( { 'skip-install': true } )
      .withPrompts( { buildToolChoice: 'gulp' } )
      .then( () => {
        const expected = [ 'gulpfile.js' ];
        assert.file( expected );
      } )
  });

});
