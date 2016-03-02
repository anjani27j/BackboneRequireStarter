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
         this.summaryView = new SummaryView();
      },
      fetchCars: function() {
         var queryData={},
         self = this;
         try{
            queryData.serviceType=$('#selectService')[0].selectedOptions[0].value;
            queryData.serviceName=$('#selectService')[0].selectedOptions[0].value;
            queryData.numOfPassenger=$('#passengersCount')[0].selectedOptions[0].value;
            queryData.pickupDate=$('#datepicker').val();
            if($('.pickup-auto').hasClass('hide')){
               queryData.pickupLocation =$('#pickupAtFixed')[0].selectedOptions[0].text;
            }else{
               queryData.pickupLocation= $('#pickupAtAuto').val();
            }
            queryData.pickupLocationZip='06460';
            queryData.pickupLocationId=-1;
            if($('.dropoff-auto').hasClass('hide')){
               queryData.dropoffLocation=$('#dropoffAtFixed')[0].selectedOptions[0].text;
            }else{
               queryData.dropoffLocation=$('#dropoffAtAuto').val();
            }
            queryData.dropOffLocation_id=1;
            queryData.dropOffLocationZip='11430';
            queryData.distanceMiles=0;
            this.summaryView.updateModel(queryData);
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
            if(result.models[0].get('timeStamp')){
               window.location='#';
            }else{
               this.render();
            }
         }
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
            if(this.collection.models[0].get('timeStamp')===undefined){
               var vehicleTypeId=parseInt($(event.currentTarget).attr('vehicle_type_id')),
               self = this;
               _.each(this.collection.models,function(car){
                  if(vehicleTypeId===car.get('vehicle_type_id')){
                     self.summaryView.car = car;
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