window.HotDog = Backbone.Router.extend({
  routes: {
    '': 'home',
    'blank': 'blank'
  },
    
  initialize: function() {
    this.players = new PlayersView({
      collection: window.players
    });
  },
    
  home: function() {
    var $container = $('#container');
    $container.empty();
    $container.append(this.players.render().el);
  }
});
  
$(function() {
  window.App = new HotDog();
  Backbone.history.start();
});
