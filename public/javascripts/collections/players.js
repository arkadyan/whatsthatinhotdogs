HD.Players = Backbone.Collection.extend({
  model: HD.Player,
  url: '/players',
    
  find_by_name: function(name) {
    return _.find(this.models, function(player) {
      return player.get("name") == name
    });
  },
  names: function() {
    return this.models.map(function(player){
      return player.get('name');
    });
  }
});
