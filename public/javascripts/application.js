var commify = function(num) {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};
