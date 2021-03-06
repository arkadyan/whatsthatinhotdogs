HD.Player = Backbone.Model.extend({
  parse: function(response) {
    return response;
  },
  team: function() {
    return HD.teams.get(this.get('team_id'));
  },
  teamName: function() {
    return this.team().get('name');
  },
  // attribute: 'hot dog', 'beer', 'parking', 'ticket'
  salary: function(attribute) {
    var base = parseFloat(this.get('salary').replace(/,/g, ''));
    if(typeof(attribute) != 'undefined') {
      base = base / parseFloat(this.team().get(attribute));
    }
    return base;
  }
});
