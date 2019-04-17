const gulp = require( 'gulp' );
const browserSync = require( 'browser-sync' );

gulp.task( 'browsersync', () => {
  const port = '7000';
  browserSync.init( {
    proxy: 'localhost:' + port
  } );
} );
