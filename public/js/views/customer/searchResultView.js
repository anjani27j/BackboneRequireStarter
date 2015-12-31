define([
   'jquery', 
   'backbone', 
   'handlebars', 
   'collections/cars',
   'models/car',
   'views/customer/summaryView',
   'text!templates/customer/searchResult.handlebars',
   'datetimepicker'
   ], function($, Backbone, Handlebars, Cars, Car, SummaryView, SearchResultTemplate) {
   var searchResultView = Backbone.View.extend({
      el: '#main-container',
      events: {
         'change #selectService' : 'selectServiceHandler' 
      },
      initialize: function() {
         this.template = Handlebars.compile(SearchResultTemplate);
         this.cars = new Cars();
         this.summaryView = new SummaryView();
      },
      fetchCars: function() {
         var queryData={},
         self = this;
         try{
            debugger;
            queryData.service_id=$('#selectService')[0].selectedOptions[0].value;
            queryData.num_of_passenger=$('#passengersCount')[0].selectedOptions[0].value;
            queryData.pickup_date=$('#datepicker').val();
            if($('.pickup-auto').hasClass('hide')){
               queryData.pickup_location =$('#pickupAtFixed')[0].selectedOptions[0].text;
            }else{
               queryData.pickup_location= $('#pickupAtAuto').val();
            }
            if($('.dropoff-auto').hasClass('hide')){
               queryData.dropoff_location=$('#dropoffAtFixed')[0].selectedOptions[0].text;
            }else{
               queryData.dropoff_location=$('#dropoffAtAuto').val();
            }
            queryData.service_name = $('#selectService')[0].selectedOptions[0].text;
            this.summaryView.updateModel(queryData);
         }catch(error){}
         this.cars.fetch({
            data:JSON.stringify(queryData)|| {},
            success: function(){;
               self.render();
            }
         });
      },
      render : function(){
         this.$el.removeClass('dashboard');
         this.$el.addClass('width90'); 
         this.$el.addClass('main-container-top-margin');
         this.$el.html(this.template(this.cars.toJSON()));
         this.$el.find('#sidebar-nav').hide();
         this.summaryView.render();
         return this;
      }
  });
  return searchResultView;
});