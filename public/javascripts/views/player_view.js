HD.PlayerView = Backbone.View.extend({
  tagName: 'section',
  className: 'player',

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);

    this.template = Handlebars.compile($('#player-template').html());
  },

  termMap: {
    FCI: 'family trips to the game',
    parking: 'parking spots'
  },

  render: function() {
    var unit = HD.unit();
    var unitTerm = this.termMap[unit] || unit+'s';

    var data = $.extend(this.model.toJSON(), {
      salary: this.model.salary(unit),
      realSalary: this.model.salary(),
      perUnit: this.model.team().get(unit),
      teamName: this.model.teamName(),
      unitTerm: unitTerm,
      unit: unit
    });
    var renderedContent = this.template(data);
    $(this.el).html(renderedContent);
    return this;
  }
});
