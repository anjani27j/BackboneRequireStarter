define([
   'jquery', 
   'underscore',
   'backbone',
   'handlebars',
   'views/customer/confirmReservationView',
   'models/requestSummary',
   'models/carBooking',
   'text!templates/customer/passenger.handlebars' ,
   'text!templates/customer/carRequest.handlebars',
   'bootstrap',
   'jquery.validate'
   ], function($,_, Backbone, Handlebars, ConfirmReservationView, RequestSummary,CarBooking, PassengerTemplate,CarRequestTemplate) {
   var CustomerView = Backbone.View.extend({
      el: '#requestContainer',
      events: {
         'click #add-passanger-btn, .add-pgr':'addPassenger',
         'click .remove-pgr':'removePassenger',
         'click .passenger-type': 'changePassengerType',
         'click #continue-booking' : 'continueCarBooking'
      },
      initialize: function() {
         this.template = Handlebars.compile(CarRequestTemplate);
         this.passengerTemplate = Handlebars.compile(PassengerTemplate);
         this.model = new RequestSummary();
         this.carBooking = new CarBooking();
         $.validator.addMethod( "phoneUS", function( phone_number, element ) {
            phone_number = phone_number.replace( /\s+/g, "" );
            return this.optional( element ) || phone_number.length > 9 &&
               phone_number.match( /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/ );
         }, "Please specify a valid phone number" );
         /*$.validator.addMethod( "fname", function( fname, element ) {
            return (fname.length>2?true?false);
         }, "" );*/
         this.count=1;
      },
      render: function() {
         this.car.set('pickup_date',this.summaryView.model.get('pickup_date'));
         this.car.set('return_pickup_date',this.summaryView.returnModel.get('pickup_date'));
         this.car.set('trip1Model',this.summaryView.model.attributes);
         if(this.car.attributes.trip1Model.service_type==='roundtrip_to_airport' || this.car.attributes.trip1Model.service_type==='roundtrip_from_airport'){
            this.car.set('trip2Model',this.summaryView.returnModel.attributes);
            this.car.set('returnCarResult',this.car.returnCar.attributes);
         }
         this.$el.html(this.template(this.car.toJSON()));
         //change breadcromb
         $('#car-details-breadcrumb').removeClass('btn-success');
         $('#car-details-breadcrumb').removeClass('auto-cursor');
         $('#car-details-breadcrumb').addClass('btn-primary');
         $('#request-details-breadcrumb').removeClass('btn-info');
         $('#request-details-breadcrumb').addClass('btn-success');

         $('#customer-form').validate({
             rules: {
                 custFName:{
                     minlength: 2,
                     required: true
                 },
                 custEmail: {
                     required: true,
                     email: true
                 },
                 custPhone: {
                     required: true,
                     phoneUS: true
                 }
             },
             highlight: function (element) {
                 $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                 //$('#custEmail').parent().parent().addClass('has-error')
             },
             success: function (element) {
                 element.text('').addClass('valid').closest('.form-group').removeClass('has-error').addClass('has-success');
             },
             errorClass:'error-message'
         });
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
         debugger;
         this.resetPassenger();
         if(event.currentTarget.id.split('-')[2]==='1'){
            $('#add-passanger-btn').css('display','none');
         }else{
            $('#add-passanger-btn').css('display','');
            $('#add-passanger-btn').trigger('click');
         }
      },
      continueCarBooking: function(event){
         event.preventDefault();
         event.stopImmediatePropagation();
         //Customer  & passenger details
         var customer=this.carBooking.get('customer'),
         pgrTypeId,
         passengerDetails=this.carBooking.get('passenger');
         customer.first_name = $('#custFName').val();
         customer.last_name = $('#custLName').val();
         customer.email = $('#custEmail').val();
         customer.contact_number = $('#custPhone').val();
         pgrTypeId=$('input[name=inlineRadioOptions]:radio:checked')[0].id;
         if(pgrTypeId==='passenger-type-1'){
            customer.primary_contact=true;
            passengerDetails.push(customer);
            this.carBooking.set('passenger',passengerDetails);
            customer.is_passenger = true;
         }else{

         }
         this.carBooking.set('customer',customer);
         //vehicle details
         this.carBooking.set('vehicle_type_id',this.car.get('vehicle_type_id'));
         //rates details
         var base_rate_item=this.car.get('base_rate_item');
         base_rate_item.tax=0;
         this.carBooking.set('base_rate_item',base_rate_item);
         //optional_fixed_rate_items
         var optionalFRItems = this.car.get('optional_fixed_rate_items'),
         selectedOptionalFRItems=[];
         for (var i = 0 ; i <optionalFRItems.length; i++) {
            if($('#addon-'+optionalFRItems[i].addon_id+':checked').length===1){
               selectedOptionalFRItems.push(optionalFRItems[i]);
            }
         }
         if(selectedOptionalFRItems.length>0){
            this.carBooking.set('optional_fixed_rate_items',selectedOptionalFRItems);
         }
         //incremental_rate_items
         var incrementalRates = this.car.get('incremental_rate_items'),
         selectedIncrementalRates=[];
         for (var i = 0 ; i <incrementalRates.length; i++) {
            if(parseInt($('#addon-'+incrementalRates[i].addon_id).val())>0){
               var incrRates=incrementalRates[i];
               incrRates.number_of_items = parseInt($('#addon-'+incrementalRates[i].addon_id).val());
               selectedIncrementalRates.push(incrRates);
            }
         }
         if(selectedIncrementalRates.length>0){
            this.carBooking.set('incremental_rate_items',selectedIncrementalRates );
         }
         //pickup_address
         var pickup_address = this.car.get('pickup_address');
         this.carBooking.get('pickup_address').full_address=pickup_address.full_address;
         this.carBooking.get('pickup_address').zip=pickup_address.zip;
         //dropoff_address
         var dropoff_address = this.car.get('dropoff_address');
         //this.carBooking.get('dropoff_address').full_address=dropoff_address.full_address;
         this.carBooking.get('dropoff_address').zip=dropoff_address.zip;
         //pickup_date
         this.carBooking.set('pickup_date', this.car.get('pickup_date'));
         // Save booking
         this.carBooking.save({},{
            complete:function(model, response) {
              console.log('consolempleted !') ;
            },
            success:_.bind(this.confirmReservation,this),
            error: function(model, error) {
              console.log('error.responseText');
            }
         });
      },
      confirmReservation: function(){
         this.confirmReservationView = new ConfirmReservationView(this.carBooking);
      }
      
   });
   return CustomerView;   
});