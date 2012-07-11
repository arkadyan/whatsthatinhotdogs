HD.PlayersView = Backbone.View.extend({
  tagName: 'section',
  className: 'players',

  initialize: function() {
    _.bindAll(this, 'render');
    this.template = Handlebars.compile($('#players-template').html());
    this.collection.bind('reset', this.render);
  },

  currentPlayer: function(ui) {
    var name = ui ? ui.item.value : $('#player_search').val();
    return this.collection.find_by_name(name);
  },

  playerSelected: function(e, ui) {
    var playerView = new HD.PlayerView({model: HD.playersView.currentPlayer(ui)});
    $("#player").html(playerView.render().el);
  },

  render: function() {
    var players = this.collection;

    // Set up autocomplete on the search box.
    $('#player_search').autocomplete({
      source: players.names(),
      select: HD.playersView.playerSelected
    });

    $('#salary_unit').change(function() {
      if(HD.playersView.currentPlayer()) {
        HD.playersView.playerSelected();
      }
    });

    return this;
  }

});
