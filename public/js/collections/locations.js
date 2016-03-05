define(['models/location'], function(Location) {
	var Locations = Backbone.Collection.extend({

      model: Location,

      url: '/proxy/v1/place/airport',

      initialize : function() {
      	console.log('Collection Initialized');
      }

   });
	return Locations;
});
