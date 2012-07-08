var commify = function(num) {
  num = parseInt(num);
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};
Handlebars.registerHelper('commify', commify);

var lotsOfHotdogs = function(salary) {
  var text = [];
  for (var i = 0; i <= Math.round(parseFloat(salary)); i+=10000) {
    text.push("<li>&nbsp,</li>");
  }
  return text.join('');
};

var singular = function(term) {
  var a = term.match(/park/) ? '' : 'a ';
  return a+term.replace(/s$/,'');
};

Handlebars.registerHelper('lotsOfHotdogs', function(salary) {
  return new Handlebars.SafeString( lotsOfHotdogs(salary) );
});
Handlebars.registerHelper('singular', function(salary) {
  return new Handlebars.SafeString( singular(salary) );
});
