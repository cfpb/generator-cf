const browserSync = require( 'browser-sync' );
const config = require( '../config' );
const configPkg = config.pkg;
const configBanner = config.banner;
const configScripts = config.scripts;
const gulp = require( 'gulp' );
const gulpHeader = require( 'gulp-header' );
const gulpRename = require( 'gulp-rename' );
const gulpSourcemaps = require( 'gulp-sourcemaps' );
const handleErrors = require( '../utils/handle-errors' );
const UglifyWebpackPlugin = require( 'uglifyjs-webpack-plugin' );
const webpack = require( 'webpack' );
const webpackStream = require( 'webpack-stream' );

/**
 * Bundle scripts.
 * @returns {PassThrough} A source stream.
 */
function scripts() {
  return gulp.src( configScripts.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( webpackStream( {
      output: {
        filename: '[name].js'
      },
      plugins: [
        new UglifyWebpackPlugin( {
          parallel: true,
          uglifyOptions: {
            ie8: false,
            ecma: 5,
            warnings: false,
            mangle: true,
            output: {
              comments: false,
              beautify: false
            }
          }
        } )
      ]
    }, webpack ) )
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
}

gulp.task( 'scripts', scripts );
