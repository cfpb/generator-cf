const updateNotifier = require( 'update-notifier' );
const pkg = require( '../../package.json' );

module.exports = () => {

  const notifier = updateNotifier( {
    packageName: pkg.name,
    packageVersion: pkg.version,
    updateCheckInterval: 1000 * 60 * 60 * 1 // 1 hr
  } );

  if ( notifier.update ) {
    notifier.notify( true );
  }

};