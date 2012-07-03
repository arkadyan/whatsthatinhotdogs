$(function() {
  // Initialize Backbone models.
  window.prices = new Prices();
  
  // Initialize Backbone collections.
  window.players = new Players();
  window.redsox = new Team();
  

  // Initialize Backbone views.
  // App.chromeView = new App.ChromeView({ el: $("body") });
  // App.router = new App.Router;
  
  window.App = new HotDog();

  // Initialize the Backbone router.
  Backbone.history.start();
});
