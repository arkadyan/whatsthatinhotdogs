(function($) {
  window.Player = Backbone.Model.extend({
  });
  
  window.Players = Backbone.Collection.extend({
    model: Player,
    url: '/players',
    
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
  
  
  window.Prices = Backbone.Model.extend({
    url: '/prices'
  });
  
  
  window.players = new Players();
  window.redsox = new Team();
  
  window.prices = new Prices();
  
})(jQuery);
