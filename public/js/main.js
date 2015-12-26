require.config({
	paths : {
		jquery : '../bower_components/jquery/dist/jquery.min',
		'jquery-ui' : '../bower_components/jquery-ui/jquery-ui.min',
		underscore : '../bower_components/underscore/underscore-min',
		backbone : '../bower_components/backbone/backbone',
		handlebars : '../bower_components/handlebars/handlebars.min',
		bootstrap : '../bower_components/bootstrap/bootstrap.min',
		text : '../bower_components/requirejs-text/text',
		templates : '../templates',
		datetimepicker: '../bower_components/datetimepicker/jquery.datetimepicker'
	}
});

//start the app
require(['app'], function(App) {
	App.initialize();
});