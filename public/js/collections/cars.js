define(['models/car'], function(Car) {
	var cars = Backbone.Collection.extend({

      model: Car,
      //url: '/js/data/carsData.json',
      url : '/proxy/v1/service/viewrates',
      initialize : function() {
            console.log('Collection Initialized');
      }

   });
	return cars;
});