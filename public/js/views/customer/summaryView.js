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
      },
      updateModel : function(options){
         this.model.set('service_type',options.service_type);
         this.model.set('service_name',options.service_name);
         this.model.set('num_of_assenger',options.num_of_assenger);
         this.model.set('pickup_date',options.pickup_date);
         this.model.set('pickup_location',options.pickup_location);
         this.model.set('pickup_location_zip',options.pickup_location_zip);
         this.model.set('pickup_location_id',options.pickup_location_id);
         this.model.set('dropoff_location',options.dropoff_location);
         this.model.set('drop_off_ocation_id',options.drop_off_ocation_id);
         this.model.set('drop_off_location_zip',options.drop_off_location_zip);
         this.model.set('distance_miles',options.distance_miles);
      },
      render: function() {
         this.$el = $('#requestSummary');
         this.$el.html(this.template(this.model.toJSON()));
         return this;
      }
   });
   return SummaryView;   
});