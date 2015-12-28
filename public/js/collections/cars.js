define(['models/car'], function(Car) {
	var cars = Backbone.Collection.extend({

      model: Car,

      url: '/js/data/carsData.json',

      initialize : function() {
      	console.log('Collection Initialized');
      }

   });
	return cars;
});