define([
   'jquery', 
   'backbone',
   'handlebars',
   'models/requestSummary',
   'text!templates/customer/carRequest.handlebars'
   ], function($, Backbone, Handlebars, RequestSummary, CarRequestTemplate) {
   var CustomerView = Backbone.View.extend({
      el: '#requestContainer',
      events: { 
      },
      initialize: function() {
         this.template = Handlebars.compile(CarRequestTemplate);
         this.model = new RequestSummary();
      },
      render: function() {
         this.$el;
         this.$el.html(this.template(this.model.toJSON()));
      }
   });
   return CustomerView;   
});