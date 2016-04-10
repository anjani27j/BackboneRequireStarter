define([
   'jquery', 
   'backbone',
   'handlebars',
   'text!templates/customer/paymentSuccess.handlebars'
   ], function($, Backbone, Handlebars, paymentTemplate) {

   var PaymentView = Backbone.View.extend({
      //el: '#requestSummary',
      events: { 
      },
      initialize: function(data) {
         this.jsonData = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
         
         //console.log(jsonData);
         this.template = Handlebars.compile(paymentTemplate);
      },
      render: function() {
         this.$el = $('#main-container');
         this.jsonData.amount = this.jsonData.amount/100;
         this.$el.html(this.template(this.jsonData));
         return this;
      }
   });
   return PaymentView;   
});