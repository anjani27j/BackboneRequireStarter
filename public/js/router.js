define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var Router = Backbone.Router.extend({
		routes : {
			'' : 'showSearch',
			'searchResult' : 'showSearchResult',
			'dashboard' : 'showAdminDashboard',
			'orders/:id' : 'showOrderDetails',
			'signin' : 'showSignIn',
			'signup' : 'showSignUp'
		},
		execute: function(callback, args, name) {
			$('#sidebar-nav').hide();
		   	if (callback) callback.apply(this, args);
		},
		initialize : function() {
			$('#sidebar-nav').hide();
			require(['views/admin/sideMenuView'], function(SideMenuView) {
				var sideMenuView = new SideMenuView();
				sideMenuView.render();
			})
		},
		showSignIn : function() {
			$('.navbar').hide();
			$('#main-container').removeClass().addClass('container');
			require(['views/signInView'], function(SignInView) {
				var signInView = new SignInView();
				signInView.render();
			})
		},
		showSignUp : function() {
			$('.navbar').hide();
			$('#main-container').removeClass().addClass('container');
			require(['views/signUpView'], function(SignUpView) {
				var signUpView = new SignUpView();
				signUpView.render();
			})
		},
		showSearch : function() {
			$('.navbar').show();
			var self = this;
			require(['views/customer/mainSearchView'], function(MainSearchView) {
				var mainSearchView = new MainSearchView();
				mainSearchView.render();
			})
		},
		showSearchResult : function() {
			var self = this;
			require(['views/customer/searchResultView'], function(SearchResultView) {
				var searchResultView = new SearchResultView();
				searchResultView.fetchCars();
			})
		},
		//all admin route callbacks go here
		showAdminDashboard : function() {
			$('.navbar').show();
			$('#main-container').removeClass().addClass('container dashboard');
			var self = this;
			require(['views/admin/adminDashboardView'], function(AdminDashboardView) {
				var adminDashboardView = new AdminDashboardView();
				adminDashboardView.render();
			})
		},
		showOrderDetails : function() {
			var self = this;
			require(['views/admin/adminOrderDetailsView'], function(AdminOrderDetailsView) {
				var adminOrderDetailsView = new AdminOrderDetailsView();
				adminOrderDetailsView.render();
			})
		}
	});
	return Router;
});