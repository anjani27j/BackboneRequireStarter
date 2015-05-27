require.config({
	paths : {
		jquery : '../bower_components/jquery/dist/jquery.min',
		underscore : '../bower_components/underscore/underscore-min',
		backbone : '../bower_components/backbone/backbone',
		handlebars : '../bower_components/handlebars/handlebars.min',
		bootstrap : '../bower_components/bootstrap/bootstrap.min',
		text : '../bower_components/requirejs-text/text',
		templates : '../templates'
	}
});

//start the app
require(['app'], function(App) {
	App.initialize();
});