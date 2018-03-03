const browserSync = require( 'browser-sync' );
const configImages = require( '../config' ).images;
const gulp = require( 'gulp' );
const gulpChanged = require( 'gulp-changed' );
const gulpImagemin = require( 'gulp-imagemin' );
const handleErrors = require( '../utils/handle-errors' );

/**
 * Move and process images for the project.
 * @returns {PassThrough} A source stream.
 */
function images() {
  return gulp.src( configImages.src )
    .pipe( gulpChanged( configImages.dest ) )
    .pipe( gulpImagemin() )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( configImages.dest ) )
    .pipe( browserSync.reload( {
      stream: true
    } ) );
}

gulp.task( 'images', images );
