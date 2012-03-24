(function($) {
  
  
  window.Player = Backbone.Model.extend({
    
  });
  
  window.Players = Backbone.Collection.extend({
    model: Player,
    url: 'players_2011.json',
    
    names: function() {
      return this.models.map(function(player){
        return player.get('player_full_name');
      });
    }
  });

  window.Team = Players.extend({
    url: 'http://severe-mist-9223.herokuapp.com/team/redsox'
  });
  
  window.players = new Players();
  window.redsox = new Team();
  
  
  
})(jQuery);
