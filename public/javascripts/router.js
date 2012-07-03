window.HotDog = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
    
  initialize: function() {
    this.players = new PlayersView({
      collection: window.players
    });
  },
    
  home: function() {
  }
});
