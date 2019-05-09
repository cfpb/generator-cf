const frameworkComponents = [];

function getCfComponents( data ) {
  data.forEach( function( el, i ) {
    let name;
    if ( el.type === 'dir' && el.name !== 'capital-framework' ) {
      name = el.name.replace( 'cf-', '' );
      frameworkComponents.push( {
        name: name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
        value: el.name
      } );
    }
  } );
  // Sort them alphabetically
  return frameworkComponents.sort( function( a, b ) {
      return a.name > b.name ? 1 : -1;
  } );
}

module.exports = getCfComponents;
