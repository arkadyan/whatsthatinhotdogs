(function($) {
  
  
  window.Player = Backbone.Model.extend({
    
  });
  
  window.Players = Backbone.Collection.extend({
    model: Player,
    url: 'public/players.json',
    
    parse: function(response) {
      var resp = [];
      var players = response['data']['players'];
      for (var player in players) {
        resp.push(players[player]);
      }
      return resp;
    }
  });

  window.Team = Players.extend({
    url: 'http://severe-mist-9223.herokuapp.com/team/redsox'
  });
  
  window.players = new Players();
  window.redsox = new Team();
  
  
  
})(jQuery);
