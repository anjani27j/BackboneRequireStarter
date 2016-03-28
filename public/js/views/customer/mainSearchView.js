define([
   'jquery', 
   'backbone', 
   'handlebars', 
   'models/searchSummary', 
   'collections/locations', 
   'text!templates/customer/mainSearch.handlebars',
   'datetimepicker'
   ], function($, Backbone, Handlebars, SearchSummary, Locations, SearchTemplate) {
   var mainSearchView = Backbone.View.extend({
      el: '#main-container',
      events: {
         'change #selectService' : 'selectServiceHandler',
         'click #newCarSearch' : 'newCarSearchHandler',
         'change #pickupAtAuto': 'pickupAtAutoChange'
      },
      initialize: function() {
         this.template = Handlebars.compile(SearchTemplate);
         this.model = new SearchSummary();
         this.pickupid='pickupAtAuto';
         this.dropoffid='dropoffAtFixed';
         this.locations = new Locations();
         this.listenTo(this.locations, 'update locations', this.updateLocations, this);
         var self = this;
         this.locations.fetch({
            type:'GET',
            success: function(){
               self.updateLocations();
            }
         });
      },
      render: function() {
         this.$el.removeClass('dashboard');
         this.$el.addClass('width90');
         this.$el.addClass('main-container-top-margin');
         this.$el.html(this.template);
         $( "#datepicker" ).datetimepicker({
            format:'m/d/Y H:i'
         });
         $( "#returnDatepicker" ).datetimepicker({
            format:'m/d/Y H:i'
         });
         
         this.initGoogleMap('pickupAtAuto');
         return this;
      },
      updateLocations : function(selector){
         var options = '';
         $.each(this.locations.models,function(i,location){
            options += '<option value="'+location.get('place_id')+'" zip_code="'+location.get('zip_code')+'">'+location.get('place_name')+'</option>'
         })
         if(selector){
            $('#'+selector).html(options);
         }else{
            $('#dropoffAtFixed').html(options);
         }
      },
      selectServiceHandler: function(event){
         var selectedOption= $(event.currentTarget)[0].selectedOptions[0].value;
         this.model.set('car_service_code',selectedOption);
         switch(selectedOption){
            case 'to_airport':
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').removeClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').addClass('hide');
               $('.roundtrip').addClass('hide');
               this.pickupid='pickupAtAuto';
               this.dropoffid='dropoffAtFixed';
               this.initGoogleMap('pickupAtAuto');
               this.updateLocations('dropoffAtFixed');
               break;
            case 'from_airport':
               $('.pickup-auto').addClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').removeClass('hide');
               $('.dropoff-auto').removeClass('hide');
               $('.roundtrip').addClass('hide');
               this.pickupid='pickupAtFixed';
               this.dropoffid='dropoffAtAuto';
               this.initGoogleMap('dropoffAtAuto');
               this.updateLocations('pickupAtFixed');
               break;
            case 'roundtrip_to_airport':
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
               this.returnPickupid='returnPickupAtFixed';
               this.returnDropoffid='returnDropoffAtAuto';
               this.initGoogleMap('pickupAtAuto');
               this.initGoogleMap('returnDropoffAtAuto');
               this.updateLocations('dropoffAtFixed');
               this.updateLocations('returnPickupAtFixed');
               break;
            case 'roundtrip_from_airport':
               $('.roundtrip').removeClass('hide');
               $('.pickup-auto').addClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').removeClass('hide');
               $('.dropoff-auto').removeClass('hide');
               $('.return-pickup-auto').removeClass('hide');
               $('.return-dropoff-fixed').removeClass('hide');
               $('.return-pickup-fixed').addClass('hide');
               $('.return-dropoff-auto').addClass('hide');
               this.pickupid='pickupAtFixed';
               this.dropoffid='dropoffAtAuto';
               this.returnPickupid='returnPickupAtAuto';
               this.returnDropoffid='returnDropoffAtFixed';
               this.initGoogleMap('dropoffAtAuto');
               this.initGoogleMap('returnPickupAtAuto');
               this.updateLocations('pickupAtFixed');
               this.updateLocations('returnDropoffAtFixed');
               break;
            case 'one_way':
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').removeClass('hide');
               $('.roundtrip').addClass('hide');
               this.initGoogleMap('pickupAtAuto');
               this.initGoogleMap('dropoffAtAuto');
               this.dropoffid='dropoffAtAuto';
               this.pickupid='pickupAtAuto';
               break;
            case 'to_train':
               $('.pickup-auto').removeClass('hide');
               $('.dropoff-fixed').removeClass('hide');
               $('.pickup-fixed').addClass('hide');
               $('.dropoff-auto').addClass('hide');
               $('.roundtrip').addClass('hide');
               this.dropoffid='dropoffAtFixed';
               this.pickupid='pickupAtAuto';
               this.initGoogleMap('pickupAtAuto');
               this.updateLocations('dropoffAtFixed');
               break;
            case 'from_train':
               $('.pickup-auto').addClass('hide');
               $('.dropoff-fixed').addClass('hide');
               $('.pickup-fixed').removeClass('hide');
               $('.dropoff-auto').removeClass('hide');
               $('.roundtrip').addClass('hide');
               this.dropoffid='dropoffAtAuto';
               this.pickupid='pickupAtFixed';
               this.initGoogleMap('dropoffAtAuto');
               this.updateLocations('pickupAtFixed');
               break;
         }
      },
      newCarSearchHandler : function(event){
         /*var query='';
         query+='serviceType='+$('#selectService')[0].selectedOptions[0].value;
         query+='&numOfPassenger'+$('#passengersCount')[0].selectedOptions[0].value;
         query+='&pickup_date+'+$('#datepicker').text();
         if($('.pickup-auto').hasClass('hide')){
            query+='&pickup_location'+$('#pickupAtFixed').text();
         }else{
            query+='&pickup_location'+$('#pickupAtAuto').val();
         }
         
         if($('.dropoff-auto').hasClass('hide')){
            query+='&dropoff_location'+$('#dropoffAtFixed').text();
         }else{
            query+='&dropoff_location'+$('#dropoffAtAuto').val();
         }
         if($($('#selectService')[0].selectedOptions).attr('type')==='twoway'){
         }*/
         window.location='#searchResult';
        // $('#newCarSearch').click();
      },
      'initGoogleMap' : function(selector){
         if(!!navigator.geolocation) {
            var map,
            self = this;
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
               self.selctedPlace=places;
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