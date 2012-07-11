$(function() {
  // Initialize Backbone models.
  HD.prices = new HD.Prices();
  
  // Initialize Backbone collections.
  HD.players = new HD.Players();
  HD.redsox = new HD.Team();
  

  // Initialize Backbone views.
  HD.playersView = new HD.PlayersView({
    collection: HD.players
  });
  
  HD.router = new HD.Router;

  // Initialize the Backbone router.
  Backbone.history.start();
});
