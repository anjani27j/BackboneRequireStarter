define(function() {
   var AdminDashboardModel = Backbone.Model.extend({
   		url: 'js/data/dashboard.json',
      	initialize: function() {
      	}
   });
   return AdminDashboardModel;
});