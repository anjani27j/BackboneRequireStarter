define(['models/tweet'], function(Tweet) {
	var Tweets = Backbone.Collection.extend({

      model: Tweet,

      url: '/js/data/sampledata.json',

      initialize : function() {
      	console.log('Collection Initialized');
      }

   });
	return Tweets;
});
