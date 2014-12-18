// Count all cf-components included in the test page.
$('.feature-list').append(
  '<div class="feature-list_item">' +
  '<h3 class="feature-list_header">jQuery</h3>' +
  '<p>jQuery counts a total of ' +
  '<strong>' + ( $('.feature-list_item').size() ) + '</strong> ' +
  'cf-components.</p>' +
  '</div>'
);
