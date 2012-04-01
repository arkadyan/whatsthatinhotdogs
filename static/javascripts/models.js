(function($) {
  window.Player = Backbone.Model.extend({
    parse: function(response) {
      // TODO: We should make this more resistant to being loaded before we have the prices.
      var salary = parseInt(response.salary.replace(/,/g, ''));
      var team = response.team_full_name;
      // TODO: This shouldn't know about window.prices.
      response.hotdog_salary = salary / window.prices.get(team);
      return response;
    }
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
  
  
  window.prices = new Prices();
  
  window.players = new Players();
  window.redsox = new Team();
  
})(jQuery);
