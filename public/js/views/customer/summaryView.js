define([
   'jquery', 
   'backbone',
   'handlebars',
   'models/searchSummary',
   'text!templates/customer/summary.handlebars'
   ], function($, Backbone, Handlebars, SearchSummary, SumaryTemplate) {

   var SummaryView = Backbone.View.extend({
      //el: '#requestSummary',
      events: { 
      },
      initialize: function() {
         this.template = Handlebars.compile(SumaryTemplate);
         this.model = new SearchSummary();
         this.returnModel = new SearchSummary();
      },
      updateModel : function(options,isReturn){
         var model;
         if(isReturn){
            model=this.returnModel;
         }else{
            model=this.model;
         }
         model.set('service_type',options.service_type);
         model.set('service_name',options.service_name);
         model.set('num_of_assenger',options.num_of_assenger);
         model.set('pickup_date',options.pickup_date);
         model.set('pickup_location',options.pickup_location);
         model.set('pickup_location_zip',options.pickup_location_zip);
         model.set('pickup_location_id',options.pickup_location_id);
         model.set('dropoff_location',options.dropoff_location);
         model.set('drop_off_ocation_id',options.drop_off_ocation_id);
         model.set('drop_off_location_zip',options.drop_off_location_zip);
         model.set('distance_miles',options.distance_miles);
      },
      render: function() {
         this.$el = $('#requestSummary');
         this.$el.html(this.template(this.model.toJSON()));
         return this;
      }
   });
   return SummaryView;   
});