define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var Router = Backbone.Router.extend({
		routes : {
			'' : 'showSearch',
			'dashboard' : 'showAdminDashboard'
		},
		initialize : function() {
			require(['views/admin/sideMenuView'], function(SideMenuView) {
				var sideMenuView = new SideMenuView();
				sideMenuView.render();
			})
		},
		showSearch : function() {
			var self = this;
			require(['views/customer/mainSearchView'], function(MainSearchView) {
				var mainSearchView = new MainSearchView();
				mainSearchView.render();
			})
		},
		//all admin route callbacks go here
		showAdminDashboard : function() {
			var self = this;
			require(['views/admin/adminDashboardView'], function(AdminDashboardView) {
				var adminDashboardView = new AdminDashboardView();
				adminDashboardView.render();
			})
		}
	});
	return Router;
});