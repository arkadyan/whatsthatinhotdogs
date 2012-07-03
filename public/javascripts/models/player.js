window.Player = Backbone.Model.extend({
  parse: function(response) {
    // TODO: We should make this more resistant to being loaded before we have the prices.
    var salary = parseInt(response.salary.replace(/,/g, ''));
    var team = response.team_full_name;
    // TODO: This shouldn't know about window.prices.
    response.hotdog_salary = salary / window.prices.get(team);
    return response;
  }
});  
