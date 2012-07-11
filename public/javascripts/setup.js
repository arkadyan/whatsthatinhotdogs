$(function() {
  // Initialize Backbone models.
  // HD.prices = new HD.Prices();
  HD.teams = new HD.Teams();

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

  HD.teams.fetch();
  HD.players.fetch();
});
