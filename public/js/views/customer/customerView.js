define([
   'jquery', 
   'backbone',
   'handlebars',
   'models/requestSummary',
   'text!templates/customer/passenger.handlebars' ,
   'text!templates/customer/carRequest.handlebars',
   'bootstrap'
   ], function($, Backbone, Handlebars, RequestSummary, PassengerTemplate,CarRequestTemplate) {
   var CustomerView = Backbone.View.extend({
      el: '#requestContainer',
      events: {
         'click #add-passanger-btn, .add-pgr':'addPassenger',
         'click .remove-pgr':'removePassenger',
         'click .passenger-type': 'changePassengerType'
      },
      initialize: function() {
         this.template = Handlebars.compile(CarRequestTemplate);
         this.passengerTemplate = Handlebars.compile(PassengerTemplate);
         this.model = new RequestSummary();
         this.count=1;
      },
      render: function() {
         this.car.set('pickupDate',this.summaryView.model.get('pickupDate'));
         this.$el.html(this.template(this.car.toJSON()));
      },
      addPassenger: function(event){
         event.preventDefault();
         event.stopImmediatePropagation();
         if(this.count===1){
            $('#passenger-container').html(this.passengerTemplate({'count':this.count}));
            this.count++;
         }else{
             $(this.passengerTemplate({'count':this.count})).insertAfter($('#passenger-container').children()[$('#passenger-container').children().length-1]);
            this.count++;
         }
      },
      removePassenger: function(event){
         var currentCount=event.currentTarget.id.split('-')[2];
         $('#passenger-detail-'+currentCount).remove();
         if($('#passenger-container').children().length===0){
            this.count=1;
         }
      },
      resetPassenger: function(){
         this.count=1;
         $('#passenger-container').html('');
      },
      changePassengerType: function(event){
         this.resetPassenger();
         if(event.currentTarget.id.split('-')[2]==='1'){
            $('#add-passanger-btn').css('display','none');
         }else{
            $('#add-passanger-btn').css('display','');
            this.addPassenger();
         }
      }
   });
   return CustomerView;   
});