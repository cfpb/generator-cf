/* The following line imports jQuery into your project.
   If you don't need jQuery, delete it. */
const $ = global.$ = require( 'jquery' );

<%
  const isExpandables = function( el ) {
    return el.name === 'cf-expandables';
  }
  if ( ! components.some( isExpandables ) ) {
%> // <% } %>require( 'cf-expandables/src/Expandable' ).init();

<%
  const isTables = function( el ) {
    return el.name === 'cf-tables';
  }
  if ( ! components.some( isTables ) ) {
%> // <% } %>require( 'cf-tables/src/Table' ).init();

// Count all features included in the test page.
$( '.feature-list' ).append(
  '<section class="feature-list_item' +
  ' block block__padded-top block__border-top">' +
  '<div class="feature-header">' +
  '<h1 class="feature-header_name">jQuery</h1>' +
  '</div>' +
  '<p>jQuery is working and counts a total of ' +
  '<strong>' + $( '.feature-list_item' ).size() + '</strong> ' +
  'cf-components.</p>' +
  '</section>'
);
