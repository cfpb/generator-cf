const path = require( 'path' );
const helpers = require( 'yeoman-test' );
const assert = require( 'yeoman-assert' );

describe( 'cf generator', function() {
  this.timeout(10000);

  beforeEach( () => {
    this.generator = helpers.run( path.join( __dirname, '../app' ) );
  } );

  afterEach( () => {
    this.generator.cleanTestDirectory();
  } );

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
      } );
  } );

  it( 'creates expected files when run', () => {
    return this.generator
      .withOptions( { 'skip-install': true } )
      .then( () => {
        const expected = [
          // add files you expect to exist here.
          '.eslintrc',
          '.gitignore',
          'package.json',
          'gulpfile.js'
        ];
        assert.file( expected );
      } );
  } );

} );
