window.PlayerView = Backbone.View.extend({
  tagName: 'section',
  className: 'player',
    
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    
    this.template = Handlebars.compile($('#player-template').html());
  },
    
  render: function() {
    var renderedContent = this.template(this.model.toJSON());
    $(this.el).html(renderedContent);
    return this;
  }
});
