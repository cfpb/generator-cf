const gulp = require( 'gulp' );
const gulpAutoprefixer = require( 'gulp-autoprefixer' );
const gulpCleanCss = require( 'gulp-clean-css' );
const gulpHeader = require( 'gulp-header' );
const gulpLess = require( 'gulp-less' );
const gulpRename = require( 'gulp-rename' );
const gulpSourcemaps = require( 'gulp-sourcemaps' );
const mqr = require( 'gulp-mq-remove' );
const config = require( '../config' );
const configPkg = config.pkg;
const configBanner = config.banner;
const configStyles = config.styles;
const handleErrors = require( '../utils/handle-errors' );
const browserSync = require( 'browser-sync' );

/**
 * Process modern CSS.
 * @returns {PassThrough} A source stream.
 */
function stylesModern() {
  return gulp.src( configStyles.cwd + configStyles.src )
    .pipe( gulpSourcemaps.init() )
    .pipe( gulpLess( configStyles.settings ) )
    .on( 'error', handleErrors.bind( this, { exitProcess: true } ) )
    .pipe( gulpAutoprefixer( {
      browsers: [
        'last 2 versions',
        'Explorer >= 9' ]
    } ) )
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
    .pipe( gulpAutoprefixer( {
      browsers: [ 'ie 8' ]
    } ) )
    .pipe( mqr( {
      width: '75em'
    } ) )
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
