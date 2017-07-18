'use strict';

const gulp = require( 'gulp' );
const gulpUtil = require( 'gulp-util' );
const browserSync = require( 'browser-sync' );

gulp.task( 'browserSync', () => {
  const port = gulpUtil.env.port || '7000';
  browserSync.init( {
    proxy: 'localhost:' + port
  } );
} );
