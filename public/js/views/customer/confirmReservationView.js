define([
   'jquery', 
   'underscore',
   'backbone',
   'handlebars',
   'text!templates/customer/confirmBooking.handlebars',
   'text!templates/customer/stripForm.handlebars',
   'bootstrap'
   ], function($,_, Backbone, Handlebars, ConfirmReservationTemplate, StripFormTemplate) {
   var ConfirmReservationView = Backbone.View.extend({
      el: '#requestContainer',
      events: {
      },
      initialize: function(carBooking) {
         this.template = Handlebars.compile(ConfirmReservationTemplate);
         this.stripFormTemplate = Handlebars.compile(StripFormTemplate);
         this.model = carBooking;
         console.log('Confirm Reservation View');
         this.render();
      },
      render: function() {
         //change breadcromb
         $('#car-details-breadcrumb').removeClass('btn-success');
         $('#car-details-breadcrumb').removeClass('auto-cursor');
         $('#car-details-breadcrumb').addClass('btn-primary');
         $('#request-details-breadcrumb').removeClass('btn-info');
         $('#request-details-breadcrumb').addClass('btn-success');
         debugger;
         this.$el.html(this.template(this.model.toJSON()));
         if(this.model.toJSON().reservation_code){
            var paymentData={
               'final_amount_charged':(this.model.toJSON().final_amount_charged * 100),
               'reservation_code':this.model.toJSON().reservation_code,
               'currency':'USD'
            }
            $('#paymentOption').html(this.stripFormTemplate(paymentData));
         }
      }
   });
   return ConfirmReservationView;   
});