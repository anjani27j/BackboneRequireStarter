require.config({
	paths : {
		jquery : '../bower_components/jquery/dist/jquery.min',
		'jquery-ui' : '../bower_components/jquery-ui/jquery-ui.min',
		underscore : '../bower_components/underscore/underscore-min',
		backbone : '../bower_components/backbone/backbone',
		handlebars : '../bower_components/handlebars/handlebars.min',
		bootstrap : '../bower_components/bootstrap/dist/js/bootstrap.min',
		text : '../bower_components/requirejs-text/text',
		templates : '../templates',
		datetimepicker: '../bower_components/datetimepicker/jquery.datetimepicker',
		globalHandlebarsHelper: 'GlobalHandlebarsHelper',
		dataTable: 'https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min'
	}
});

//start the app
require(['app'], function(App) {
	window.isUserLogged = false;
	App.initialize();
});