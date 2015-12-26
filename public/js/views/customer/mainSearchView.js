define([
   'jquery', 
   'backbone', 
   'handlebars', 
   'models/search', 
   'text!templates/customer/mainSearch.handlebars',
   'datetimepicker'
   ], function($, Backbone, Handlebars, Search, SearchTemplate) {
   var mainSearchView = Backbone.View.extend({
      el: '#main-container',
      events: {
         'change #selectService' : 'selectServiceHandler' 
      },
      initialize: function() {
         this.template = Handlebars.compile(SearchTemplate);
         this.model = new Search();
      },
      render: function() {
         this.$el.html(this.template);
         $( "#datepicker" ).datetimepicker({
            format:'m/d/Y H:i'
         });
         this.initGoogleMap('pickupAtAuto');
         return this;
      },
      selectServiceHandler: function(event){
         var selectedOption= parseInt($(event.currentTarget)[0].selectedOptions[0].value);
         switch(selectedOption){
            case 1:
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').removeClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').addClass('hide');
               this.initGoogleMap('pickupAtAuto');
               break;
            case 2:
               $('.pickup-auto').addClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').removeClass('hide');
               $('.dropoff-auto').removeClass('hide');
               this.initGoogleMap('dropoffAtAuto');
               break;
            case 3:
               break;
            case 4:
               break;
            case 5:
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').removeClass('hide');
               this.initGoogleMap('pickupAtAuto');
               this.initGoogleMap('dropoffAtAuto');
               break;
            case 6:
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').removeClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').addClass('hide');
               this.initGoogleMap('pickupAtAuto');
               break;
            case 7:
               $('.pickup-auto').addClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').removeClass('hide');
               $('.dropoff-auto').removeClass('hide');
               this.initGoogleMap('dropoffAtAuto');
               break;
         }
      },
      'initGoogleMap' : function(selector){
         if(!!navigator.geolocation) {
            var map;
            var mapOptions = {
               zoom: 15,
               mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
            var input = document.getElementById(selector);
            var searchBox = new google.maps.places.SearchBox(input);
           //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
             searchBox.setBounds(map.getBounds());
            });

            var markers = [];
            // [START region_getplaces]
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
               var places = searchBox.getPlaces();
               if (places.length == 0) {
                  return;
               }
               // Clear out the old markers.
               markers.forEach(function(marker) {
                 marker.setMap(null);
               });
               markers = [];
               // For each place, get the icon, name and location.
               var bounds = new google.maps.LatLngBounds();
               places.forEach(function(place) {
                  var icon = {
                     url: place.icon,
                     size: new google.maps.Size(71, 71),
                     origin: new google.maps.Point(0, 0),
                     anchor: new google.maps.Point(17, 34),
                     scaledSize: new google.maps.Size(25, 25)
                  };
                  // Create a marker for each place.
                  markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                  }));
                  if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                  } else {
                    bounds.extend(place.geometry.location);
                  }
               });
               map.fitBounds(bounds);
            });
            navigator.geolocation.getCurrentPosition(function(position) {
               var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
               map.setCenter(geolocate);
            });
         } else {
            document.getElementById('map-container').innerHTML = 'No Geolocation Support.';
         }
      }
   });
   return mainSearchView;   
});