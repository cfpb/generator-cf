var ignore = require('./ignore.json');
var frameworkComponents = [];

function getCfComponents( data ) {
  data.items.forEach( function(el, i) {

    var name;
    // Is it listed in the ignore.json file?
    var ignoreIt = ignore.indexOf( el.name ) >= 0;

    if ( !ignoreIt ) {
      name = el.name.replace( 'cf-', '' );
      frameworkComponents.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: el.name
      });
    }
  });
  // Sort them alphabetically
  return frameworkComponents.sort( function( a, b ) {
      return a.name > b.name ? 1 : -1;
  });
}

module.exports = getCfComponents;
