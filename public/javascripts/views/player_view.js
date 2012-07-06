HD.PlayerView = Backbone.View.extend({
  tagName: 'section',
  className: 'player',

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);

    this.template = Handlebars.compile($('#player-template').html());
  },

  render: function() {
    var scope = 'hot dog';
    
    var data = $.extend(this.model.toJSON(), {
      salary: this.model.salary(scope),
      teamName: this.model.teamName(),
      unit: scope+'s'
    });
    var renderedContent = this.template(data);
    $(this.el).html(renderedContent);
    return this;
  }
});
