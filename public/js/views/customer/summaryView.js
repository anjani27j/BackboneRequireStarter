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
         debugger;
         this.model.set('service_id',options.service_id);
         this.model.set('service_name',options.service_name);
         this.model.set('num_of_passenger',options.num_of_passenger);
         this.model.set('pickup_date',options.pickup_date);
         this.model.set('pickup_location',options.pickup_location);
         this.model.set('dropoff_location',options.dropoff_location);
      },
      render: function() {
         this.$el = $('#requestSummary');
         debugger;
         this.$el.html(this.template(this.model.toJSON()));
         return this;
      }
   });
   return SummaryView;   
});