define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var Router = Backbone.Router.extend({
		routes : {
			'' : 'showHome'
		},
		initialize : function() {

		},
		changeView : function(view) {
			function setView(view) {
				if(this.currentView){
					this.currentView.close();
				}
				this.currentView = view;
				$('#main').html(view.render().$el);
			}
			setView(view);
		},
		showHome : function() {
			var self = this;
			require(['views/HomeView'], function(HomeView) {
				var homeView = new HomeView();
				self.changeView(homeView);
			})
		}

	});

	return Router;
});