(function($) {
  
  
  window.Player = Backbone.Model.extend({
    
  });
  
  window.Players = Backbone.Collection.extend({
    model: Player,
    url: '/players'
  });
  
  window.players = new Players();
  
  
  
})(jQuery);
