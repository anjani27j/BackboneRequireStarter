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
         'change #selectService' : 'selectServiceHandler',
         'click #newCarSearch' : 'newCarSearchHandler'
      },
      initialize: function() {
         this.template = Handlebars.compile(SearchTemplate);
         this.model = new Search();
         this.pickupid='pickupAtAuto';
         this.dropoffid='dropoffAtFixed';
      },
      render: function() {
         this.$el.removeClass('dashboard');
         this.$el.addClass('width90');
         this.$el.addClass('main-container-top-margin');
         this.$el.html(this.template);
         $( "#datepicker" ).datetimepicker({
            format:'m/d/Y H:i'
         });
         this.initGoogleMap('pickupAtAuto');
         return this;
      },
      selectServiceHandler: function(event){
         var selectedOption= parseInt($(event.currentTarget)[0].selectedOptions[0].value);
         this.model.set('car_service_code',selectedOption);
         switch(selectedOption){
            case 1:
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').removeClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').addClass('hide');
               $('.roundtrip').addClass('hide');
               this.pickupid='pickupAtAuto';
               this.dropoffid='dropoffAtFixed';
               this.initGoogleMap('pickupAtAuto');
               break;
            case 2:
               $('.pickup-auto').addClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').removeClass('hide');
               $('.dropoff-auto').removeClass('hide');
               $('.roundtrip').addClass('hide');
               this.pickupid='pickupAtFixed';
               this.dropoffid='dropoffAtAuto';
               this.initGoogleMap('dropoffAtAuto');
               break;
            case 3:
               $('.roundtrip').removeClass('hide');
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').removeClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').addClass('hide');
               $('.return-pickup-auto').addClass('hide');
               $('.return-dropoff-fixed').addClass('hide');
               $('.return-pickup-fixed').removeClass('hide');
               $('.return-dropoff-auto').removeClass('hide');
               this.pickupid='pickupAtAuto';
               this.dropoffid='dropoffAtFixed';
               this.returnPickupid='pickupAtAuto';
               this.returnDropoffid='dropoffAtFixed';
               this.initGoogleMap('returnDropoffAtAuto');
               break;
            case 4:
               $('.roundtrip').removeClass('hide');
               $('.pickup-auto').addClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').removeClass('hide');
               $('.dropoff-auto').removeClass('hide');
               $('.return-pickup-auto').removeClass('hide');
               $('.return-dropoff-fixed').removeClass('hide');
               $('.return-pickup-fixed').addClass('hide');
               $('.return-dropoff-auto').addClass('hide');
               this.initGoogleMap('returnPickupAtAuto');
               break;
            case 5:
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').removeClass('hide');
               $('.roundtrip').addClass('hide');
               this.initGoogleMap('pickupAtAuto');
               this.initGoogleMap('dropoffAtAuto');
               break;
            case 6:
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').removeClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').addClass('hide');
               $('.roundtrip').addClass('hide');
               this.initGoogleMap('pickupAtAuto');
               break;
            case 7:
               $('.pickup-auto').addClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').removeClass('hide');
               $('.dropoff-auto').removeClass('hide');
               $('.roundtrip').addClass('hide');
               this.initGoogleMap('dropoffAtAuto');
               break;
         }
      },
      newCarSearchHandler : function(event){
         debugger;
         this.model.set('service_id',$('#selectService')[0].selectedOptions[0].value);
         this.model.set('num_of_passenger',parseInt($('#passengersCount')[0].selectedOptions[0].value));
         this.model.set('pickup_date',$('#datepicker').text());
         this.model.set('pickup_date',$('#datepicker').text());
         this.model.set('pickup_date',$('#datepicker').text());
         if($($('#selectService')[0].selectedOptions).attr('type')==='twoway'){

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