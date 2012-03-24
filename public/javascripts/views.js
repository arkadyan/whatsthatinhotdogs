window.PlayerView = Backbone.View.extend({
  className: 'player',
    
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
      
    this.template = _.template($('#player-template').html());
  },
    
  render: function() {
    var renderedContent = this.template(this.model.toJSON());
    $(this.el).html(renderedContent);
    return this;
  }
});

window.PlayersView = Backbone.View.extend({
  tagName: 'section',
  className: 'players',
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.template = _.template($('#players-template').html());
    this.collection.bind('reset', this.render);
  },
  
  render: function() {
    var $players,
        collection = this.collection;
      
    $(this.el).html(this.template({}));
    $players = this.$('.players');
    collection.each(function(player) {
      var view = new PlayerView({
        model: player,
        collection: collection
      });
      $players.append(view.render().el);
    });
    return this;
  }
  
});
