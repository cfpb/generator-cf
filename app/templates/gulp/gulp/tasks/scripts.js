'use strict';

const browserSync = require( 'browser-sync' );
const config = require( '../config' );
const configPkg = config.pkg;
const configBanner = config.banner;
const configScripts = config.scripts;
const gulp = require( 'gulp' );
const gulpHeader = require( 'gulp-header' );
const gulpRename = require( 'gulp-rename' );
const gulpSourcemaps = require( 'gulp-sourcemaps' );
const gulpUglify = require( 'gulp-uglify' );
const handleErrors = require( '../utils/handle-errors' );
const webpack = require( 'webpack' );
const webpackStream = require( 'webpack-stream' );

gulp.task( 'scripts', () => {
  gulp.src( configScripts.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( webpackStream( {
      output: {
        filename: '[name].js'
      }
    }, webpack ) )
    .pipe( gulpUglify() )
    .on( 'error', handleErrors )
    .pipe( gulpHeader( configBanner, { pkg: configPkg } ) )
    .pipe( gulpRename( {
      suffix: '.min'
    } ) )
    .pipe( gulpSourcemaps.write( '.' ) )
    .pipe( gulp.dest( configScripts.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
} );
