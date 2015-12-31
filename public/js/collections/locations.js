define(['models/location'], function(Location) {
	var Locations = Backbone.Collection.extend({

      model: Location,

      url: '/js/data/airportData.json',

      initialize : function() {
      	console.log('Collection Initialized');
      }

   });
	return Locations;
});
