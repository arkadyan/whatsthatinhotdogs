var commify = function(num) {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

var lotsOfHotdogs = function(salary) {
  var text = [];
  for (var i = 0; i <= Math.round(parseFloat(salary)); i+=10000) {
    text.push("<li>hot dog</li>");
  }
  return text.join('');
};
