define(['models/location'], function(Location) {
	var Locations = Backbone.Collection.extend({

      model: Location,

      url: '/getAirport',

      initialize : function() {
      	console.log('Collection Initialized');
      }

   });
	return Locations;
});
