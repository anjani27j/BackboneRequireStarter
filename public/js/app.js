define(['backbone', 'router'], function(Backbone, AppRouter) {
	var initialize = function() {
		var router = new AppRouter();
		Backbone.history.start();
	};

	return {
		initialize: initialize
	}
});