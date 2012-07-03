window.PlayersView = Backbone.View.extend({
  tagName: 'section',
  className: 'players',
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.template = Handlebars.compile($('#players-template').html());
    this.collection.bind('reset', this.render);
  },
  
  render: function() {
    var $players,
        collection = this.collection;
      
    // Set up autocomplete on the search box.
    $('#player_search').autocomplete({
      source: collection.names(),
      select: function(event, ui) {
        var playerView = new PlayerView({model: players.find_by_name(ui.item.value)});
        $("#player").html(playerView.render().el);
      }
    });
    
    return this;
  }
  
});
