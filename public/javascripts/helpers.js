var commify = function(num) {
  num = parseInt(num);
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};
Handlebars.registerHelper('commify', commify);

var lotsOfHotdogs = function(salary) {
  var text = [];
  for (var i = 0; i <= Math.round(parseFloat(salary)); i+=10000) {
    text.push("<li>hot dog</li>");
  }
  return text.join('');
};
Handlebars.registerHelper('lotsOfHotdogs', function(salary) {
  return new Handlebars.SafeString( lotsOfHotdogs(salary) );
});
