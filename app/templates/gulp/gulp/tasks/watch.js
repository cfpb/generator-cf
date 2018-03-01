/* Notes:
   - watch.js watches the source files for changes, then calls the needed task.
   - gulp/tasks/browserSync.js reloads the browser with the compiled files.
*/

const gulp = require( 'gulp' );
const config = require( '../config' );

gulp.task( 'watch', gulp.series( 'browsersync' ), () => {
  gulp.watch( config.scripts.src, [ 'scripts' ] );
  gulp.watch( config.styles.cwd + '/**/*.less', [ 'styles' ] );
  gulp.watch( config.images.src, [ 'images' ] );
  gulp.watch( config.copy.files.src, [ 'copy:files' ] );
} );
