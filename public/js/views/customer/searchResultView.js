define([
   'jquery', 
   'backbone', 
   'handlebars', 
   'collections/cars',
   'models/car',
   'views/customer/summaryView',
   'views/customer/customerView',
   'text!templates/customer/searchResult.handlebars',
   'datetimepicker'
   ], function($, Backbone, Handlebars, Cars, Car, SummaryView,CustomerView, SearchResultTemplate) {
   var searchResultView = Backbone.View.extend({
      el: '#main-container',
      events: {
         'change #selectService' : 'selectServiceHandler',
         'click .reserve-now': 'reserveNowclickHandler'
      },
      initialize: function() {
         this.template = Handlebars.compile(SearchResultTemplate);
         this.collection = new Cars();
         this.returnCollection = new Cars();
         this.summaryView = new SummaryView();
      },
      fetchCars: function() {
         var queryData={},
         returnQueryData={},
         self = this;
         try{
            queryData.service_type=$('#selectService')[0].selectedOptions[0].value;
            queryData.service_name=$('#selectService')[0].selectedOptions[0].value;
               queryData.num_of_passenger=$('#passengersCount')[0].selectedOptions[0].value;
               queryData.pickup_date=$('#datepicker').val();
               if($('.pickup-auto').hasClass('hide')){
                  queryData.pickup_location =$('#pickupAtFixed')[0].selectedOptions[0].text;
                 //queryData.pickup_location_zip=$.trim($($('#pickupAtFixed')[0].selectedOptions).attr('zip_code'));
               }else{
                  queryData.pickup_location= $('#pickupAtAuto').val();
               }
               queryData.pickup_location_zip ='06460';
               queryData.pickup_location_id=-1;
               if($('.dropoff-auto').hasClass('hide')){
                  queryData.dropoff_location=$('#dropoffAtFixed')[0].selectedOptions[0].text;
               }else{   
                  queryData.dropoff_location=$('#dropoffAtAuto').val();
               }
               queryData.drop_off_location_id=1;
               queryData.drop_off_location_zip='11430';
               queryData.distance_miles=0;
               this.summaryView.updateModel(queryData,false);

            if(queryData.service_type==='roundtrip_to_airport' || queryData.service_type==='roundtrip_from_airport'){
               returnQueryData.service_type=queryData.service_type;
               returnQueryData.num_of_passenger=$('#passengersCount')[0].selectedOptions[0].value;
               returnQueryData.pickup_date=$('#returnDatepicker').val();
               if($('.return-pickup-auto').hasClass('hide')){
                  returnQueryData.pickup_location =$('#returnPickupAtFixed')[0].selectedOptions[0].text;
                 //queryData.pickup_location_zip=$.trim($($('#pickupAtFixed')[0].selectedOptions).attr('zip_code'));
               }else{
                  returnQueryData.pickup_location= $('#returnPickupAtAuto').val();
               }
               returnQueryData.pickup_location_zip ='06460';
               returnQueryData.pickup_location_id=-1;
               if($('.return-dropoff-auto').hasClass('hide')){
                  returnQueryData.dropoff_location=$('#returnDropoffAtFixed')[0].selectedOptions[0].text;
               }else{
                  returnQueryData.dropoff_location=$('#returnDropoffAtAuto').val();
               }
               returnQueryData.drop_off_location_id=1;
               returnQueryData.drop_off_location_zip='11430';
               returnQueryData.distance_miles=0;
               this.returnQueryData=returnQueryData;
               this.summaryView.updateModel(returnQueryData,true)
            }
         }catch(error){}

         this.collection.fetch({
            contentType:'application/json',
            type:'POST',
            beforeSend:_.bind(this.showLoading,this),
            complete:_.bind(this.showLoading,this),
            data:JSON.stringify(queryData),
            success: _.bind(this.carsResultHandler,this),
            error: _.bind(this.renderError,this)
         });
      },
      'showLoading': function(){
        // debugger;
      },
      'hideLoading': function(){
        //  gger;
      },
      'carsResultHandler': function(result){
         this.models =result;
         if(this.collection.models.length>0){
            if(result.models[0].get('time_stamp')){
               window.location='#';
            }else{
               this.render();
               if(this.summaryView.model.get('service_type')==='roundtrip_to_airport' || this.summaryView.model.get('service_type')==='roundtrip_from_airport'){
                  this.returnCollection.fetch({
                     contentType:'application/json',
                     type:'POST',
                     beforeSend:_.bind(this.showLoading,this),
                     complete:_.bind(this.showLoading,this),
                     data:JSON.stringify(this.returnQueryData),
                     success: _.bind(this.returnCarsRender,this),
                     error: _.bind(this.renderError,this)
                  });
               }
            }
         }
      },
      'returnCarsRender':function(result){
         _.each(this.returnCollection.models, function(car){
            debugger;
            $('#return-price-'+car.get('vehicle_type_id')).html('Return fare :<b> $'+car.get('base_rate_item').amount+'</b>');
         });
      },
      'renderError': function(err){
         window.location='#';
      },
      render : function(){
         this.$el.removeClass('dashboard');
         this.$el.addClass('width90'); 
         this.$el.addClass('main-container-top-margin');
         this.$el.html(this.template(this.collection.toJSON()));
         this.$el.find('#sidebar-nav').hide();
         this.summaryView.cars= this.collection;
         this.summaryView.render();
         return this;
      },
      'reserveNowclickHandler': function(event){
         if(this.collection.models.length>0){
            if(this.collection.models[0].get('time_stamp')===undefined){
               var vehicleTypeId=parseInt($(event.currentTarget).attr('vehicle_type_id')),
               self = this;
               _.each(this.collection.models,function(car){
                  if(vehicleTypeId===car.get('vehicle_type_id')){
                     self.summaryView.car = car;
                  }
               });
               _.each(this.returnCollection.models,function(car){
                  if(vehicleTypeId===car.get('vehicle_type_id')){
                     self.summaryView.car.returnCar = car;
                  }
               });
               this.customerView = new CustomerView();
               this.customerView.car=this.summaryView.car; 
               this.customerView.summaryView=this.summaryView;
               this.customerView.render();
            } 
         }
      }
  }); 
  return searchResultView;
});