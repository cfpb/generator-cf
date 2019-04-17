const autoprefixer = require( 'autoprefixer' );
const browserSync = require( 'browser-sync' );
const config = require( '../config' );
const configPkg = config.pkg;
const configBanner = config.banner;
const configStyles = config.styles;
const gulp = require( 'gulp' );
const gulpCleanCss = require( 'gulp-clean-css' );
const gulpHeader = require( 'gulp-header' );
const gulpLess = require( 'gulp-less' );
const gulpRename = require( 'gulp-rename' );
const gulpPostcss = require( 'gulp-postcss' );
const gulpSourcemaps = require( 'gulp-sourcemaps' );
const handleErrors = require( '../utils/handle-errors' );
const postcssUnmq = require( 'postcss-unmq' );

/**
 * Process modern CSS.
 * @returns {PassThrough} A source stream.
 */
function stylesModern() {
  return gulp.src( configStyles.cwd + configStyles.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpLess( configStyles.settings ) )
    .on( 'error', handleErrors.bind( this, { exitProcess: true } ) )
    .pipe( gulpPostcss( [
      autoprefixer( {
        grid: true,
        browsers: [
          'last 2 versions',
          'Explorer >= 9'
        ]
      } )
    ] ) )
    .pipe( gulpHeader( configBanner, { pkg: configPkg } ) )
    .pipe( gulpRename( {
      suffix: '.min'
    } ) )
    .pipe( gulpSourcemaps.write( '.' ) )
    .pipe( gulp.dest( configStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
}

/**
 * Process legacy CSS for IE8.
 * @returns {PassThrough} A source stream.
 */
function stylesIE() {
  return gulp.src( configStyles.cwd + configStyles.src )
    .pipe( gulpLess( configStyles.settings ) )
    .on( 'error', handleErrors )
    .pipe( gulpPostcss( [
      postcssUnmq( {
        width: '75em'
      } ),
      autoprefixer( {
        browsers: [
          'ie 8'
        ]
      } )
    ] ) )
    .pipe( gulpCleanCss( {
      compatibility: 'ie8',
      inline: [ 'none' ]
    } ) )
    .pipe( gulpRename( {
      suffix:  '.ie',
      extname: '.css'
    } ) )
    .pipe( gulp.dest( configStyles.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
}

gulp.task( 'styles:modern', stylesModern );
gulp.task( 'styles:ie', stylesIE );

gulp.task( 'styles',
  gulp.parallel(
    'styles:modern',
    'styles:ie'
  )
);
