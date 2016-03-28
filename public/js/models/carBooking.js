define(function() {
   var CarBooking = Backbone.Model.extend({

   	  defaults: {
	    "customer":  {},
	    "passenger":     [],
	    "base_rate_item":    {},
	    "optional_fixed_rate_items":[],
	    "incremental_rate_items":[],
	    "pickup_address":{},
	    "dropoff_address":{},

	  },
	  url:'/proxy/v1/service/reservation',
      initialize: function() {
      }
   });
   return CarBooking;
});