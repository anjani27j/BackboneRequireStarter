define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var Router = Backbone.Router.extend({
		routes : {
			'' : 'showSearch',
			'searchResult' : 'showSearchResult',
			'dashboard' : 'showAdminDashboard',
			'reservation/:id' : 'showReservationDetails',
			'signin' : 'showSignIn',
			'signup' : 'showSignUp',
			'forgotpwd' : 'showForgotPwd',
			'myAccount' : 'showMyAccount',
			'reservations' : 'showReservations'
		},
		execute: function(callback, args, name) {
			$('#sidebar-nav').hide();
		   	if (callback) callback.apply(this, args);
		},
		initialize : function() {
			$('#sidebar-nav').hide();
	  		$('#logOut').off().on('click',function(e){
				e.preventDefault();
				$('.navbar-right .navLogged').show();
				$('.navbar-right .dropdown').hide();
			    window.isUserLogged = false;
			    Backbone.history.navigate("", {trigger: true});
			})
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
		showForgotPwd : function() {
			$('.navbar').hide();
			$('#main-container').removeClass().addClass('container');
			require(['views/forgotPwdView'], function(ForgotPwdView) {
				var forgotPwdView = new ForgotPwdView();
				forgotPwdView.render();
			})
		},
		showSearch : function() {
			$('.navbar').show();
			if(window.isUserLogged){
				$('.navbar-right .navLogged').hide();
				$('.navbar-right .dropdown').show();
			}else{
				$('.navbar-right .navLogged').show();
				$('.navbar-right .dropdown').hide();
			}
			var self = this;
			require(['views/customer/mainSearchView'], function(MainSearchView) {
				var mainSearchView = new MainSearchView();
				mainSearchView.render();
			})
		},
		showSearchResult : function() {
			$('.navbar').show();
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
		showReservations :function() {
			$('.navbar').show();
			$('#main-container').removeClass().addClass('container dashboard');
			var self = this;
			require(['views/admin/adminReservationsView'], function(AdminReservationsView) {
				var adminReservationsView = new AdminReservationsView();
				adminReservationsView.render();
			})
		},
		showReservationDetails : function() {
			$('.navbar').show();
			$('#main-container').removeClass().addClass('container dashboard');
			var self = this;
			require(['views/admin/adminOrderDetailsView'], function(AdminOrderDetailsView) {
				var adminOrderDetailsView = new AdminOrderDetailsView();
				adminOrderDetailsView.render();
			})
		},
		showMyAccount : function() {

		}
	});
	return Router;
});