(function($) {
  window.Player = Backbone.Model.extend({
  });
  
  window.Players = Backbone.Collection.extend({
    model: Player,
    url: '/static/players_2011.json',
    
    find_by_name: function(name) {
      return _.find(this.models, function(player) {
        return player.get("player_full_name") == name
      });
    },
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
