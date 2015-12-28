define([
	'models/search'
	], function(Search) {
	var searchCollection = Backbone.Collection.extend({
      model: Search,
      initialize : function() {
      	console.log('Collection Initialized');
      }
   });
	return searchCollection;
});
