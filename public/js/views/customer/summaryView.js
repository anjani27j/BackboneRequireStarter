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
         this.model.set('serviceType',options.serviceType);
         this.model.set('serviceName',options.serviceName);
         this.model.set('numOfPassenger',options.numOfPassenger);
         this.model.set('pickupDate',options.pickupDate);
         this.model.set('pickupLocation',options.pickupLocation);
         this.model.set('pickupLocationZip',options.pickupLocationZip);
         this.model.set('pickupLocationId',options.pickupLocationId);
         this.model.set('dropoffLocation',options.dropoffLocation);
         this.model.set('dropOffLocation_id',options.dropOffLocation_id);
         this.model.set('dropOffLocationZip',options.dropOffLocationZip);
         this.model.set('distanceMiles',options.distanceMiles);
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