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
         Backbone.history.navigate('paymentstatus', {trigger:false});
         $.ajax({
            url: '/proxy/v1/reservation/'+this.jsonData.desc,
            type: 'PUT',
            data: {"transaction_id":this.jsonData.pay_ref_no, "amount_charged":this.jsonData.amount/100},
            success: function(data) {
              //alert('Load was performed.');
            }
         });
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