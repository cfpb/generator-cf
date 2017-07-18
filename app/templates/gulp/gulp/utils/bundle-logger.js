'use strict';

/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

const gulpUtil = require( 'gulp-util' );
const prettyHrtime = require( 'pretty-hrtime' );
let startTime = 0;

module.exports = {
  start: function( filepath ) {
    startTime = process.hrtime();
    gulpUtil.log(
      'Bundling',
      gulpUtil.colors.green( filepath ) + '...'
    );
  },
  watch: function( bundleName ) {
    gulpUtil.log(
      'Watching files required by',
      gulpUtil.colors.yellow( bundleName )
    );
  },
  end: function( filepath ) {
    const taskTime = process.hrtime( startTime );
    const prettyTime = prettyHrtime( taskTime );
    gulpUtil.log(
      'Bundled',
      gulpUtil.colors.green( filepath ),
      'in', gulpUtil.colors.magenta( prettyTime )
    );
  }
};
