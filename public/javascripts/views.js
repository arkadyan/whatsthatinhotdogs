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
