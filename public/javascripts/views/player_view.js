HD.PlayerView = Backbone.View.extend({
  tagName: 'section',
  className: 'player',

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);

    this.template = Handlebars.compile($('#player-template').html());
  },

  render: function() {
    var unit = HD.unit();

    var data = $.extend(this.model.toJSON(), {
      salary: this.model.salary(unit),
      realSalary: this.model.salary(),
      perUnit: this.model.team().get(unit),
      teamName: this.model.teamName(),
      unit: unit+'s'
    });
    var renderedContent = this.template(data);
    $(this.el).html(renderedContent);
    return this;
  }
});
