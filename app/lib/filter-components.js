var ignore = require('./ignore.json');
var frameworkComponents = [];

function getCfComponents( data ) {
  data.forEach( function(el, i) {

    var name;
    // Does it start with "cf-"?
    var startsWithCf = el.name.indexOf('cf-') === 0;
    // Is it listed in the ignore.json file?
    var ignoreIt = ignore.indexOf( el.name ) >= 0;
    // Is the word deprecated in the description?
    var isDeprecated = el.description.toLowerCase().indexOf('deprecated') >= 0;
    // Has GitHub determined its language (meaning it's probably not an empty repo.)?
    var hasLanguage = el.language !== null;

    if ( startsWithCf && !ignoreIt && !isDeprecated && hasLanguage ) {
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