define(function() {
   var CarBooking = Backbone.Model.extend({

   	  defaults: {
	    "customer":  {
	    	"first_name": "Rhishi",
			"last_name": "Nema",
			"middle_name": "Raj",
			"contact_number": "8605744456",
			"email": "rhishi.nema@gmail.com",
			"is_passenger": false,
			"primary_contact": true
	    },
	    "passenger":[{
			"first_name": "Siddhu",
			"last_name": "Narke",
			"email": "siddhu.narke@gmail.com",
			"contact_number": "2034567892",
			"primary_contact": false
		}],
	    "base_rate_item": {
	    	"rate_type": "flat",
		  	"amount": 198.0,
		  	"tax": 0
	    },
	    "optional_fixed_rate_items":[{
		  "addon_id": 1,
		  "description": "Meet and Greet service",
		  "amount": 12
		 }, {
		  "addon_id": 2,
		  "description": "Extra Stops",
		  "amount": 20
		 }],
	    "incremental_rate_items":[{
		  "addon_id": 6,
		  "amount": 0,
		  "description": "Bags",
		  "incremental_minimum": 0,
		  "incremental_maximum": 12,
		  "number_of_items": 2
		 }],
	    "pickup_address":{
		  "location_name": "",
		  "location_id": -1,
		  "location_code": "Milford",
		  "location_type": "Place",
		  "city": "Milford",
		  "state": "CT",
		  "zip": "06460",
		  "full_address": "101 Robert Treat Drive, Milford, CT, 06460",
		  "airline_name": "Etihad",
		  "flight_id": "EY101",
		  "longitude": -73.07122909999998,
		  "latitude": 41.2138383
	    },
	    "dropoff_address":{
	    	"location_name": "John F. Kennedy International Airport",
			  "location_id": 1,
			  "location_code": "JFK",
			  "location_type": "Airport",
			  "city": "Jamaica",
			  "state": "NY",
			  "zip": "11430",
			  "full_address": "Jamaica, NY, 11430",
			  "airline_name": "Etihad",
			  "flight_id": "EY101",
			  "longitude": -73.7889689,
			  "latitude": 40.6433507
	    }
	  },
	  url:'/proxy/v1/reservation',
      initialize: function() {
      }
   });
   return CarBooking;
});