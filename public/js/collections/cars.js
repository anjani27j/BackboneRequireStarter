define(['models/car'], function(Car) {
	var cars = Backbone.Collection.extend({

      model: Car,
      //url: '/js/data/carsData.json',
      url : '/fetchCarsPost',
      initialize : function() {
      	console.log('Collection Initialized');
      /*	$.ajaxSetup({
      		'cache':false
      	});*/
      }

   });
	return cars;
});