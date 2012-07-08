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
  return term.replace(/trips/,'trip').replace(/s$/,'');
};

var liter = function(term) {
  if(term.match(/trip/)) {
    return 'trips';
  } else {
    return term;
  }
};


Handlebars.registerHelper('lotsOfHotdogs', function(salary) {
  return new Handlebars.SafeString( lotsOfHotdogs(salary) );
});

Handlebars.registerHelper('singular', function(salary) {
  return new Handlebars.SafeString( singular(salary) );
});
Handlebars.registerHelper('liter', function(salary) {
  return new Handlebars.SafeString( liter(salary) );
});
