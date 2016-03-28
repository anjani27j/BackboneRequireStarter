define([
   'jquery', 
   'underscore',
   'backbone',
   'handlebars',
   'models/requestSummary',
   'models/carBooking',
   'text!templates/customer/passenger.handlebars' ,
   'text!templates/customer/carRequest.handlebars',
   'bootstrap'
   ], function($,_, Backbone, Handlebars, RequestSummary,CarBooking, PassengerTemplate,CarRequestTemplate) {
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
      },
      continueCarBooking: function(event){
         debugger;
         event.preventDefault();
         event.stopImmediatePropagation();
         //Customer details
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
         }
         this.carBooking.set('customer',customer);
         //vehicle details
         this.carBooking.set('vehicle_type_id',this.car.get('vehicle_type_id'));
         //rates details
         this.carBooking.set('base_rate_item',this.car.get('base_rate_item'));
         var optionalFRItems = this.car.get('optional_fixed_rate_items'),
         selectedOptionalFRItems=[];
         for (var i = 0 ; i <optionalFRItems.length; i++) {
            if($('#addon-'+optionalFRItems[i].addon_id+':checked').length===1){
               selectedOptionalFRItems.push(optionalFRItems[i]);
            }
         }
         this.carBooking.set('optional_fixed_rate_items',selectedOptionalFRItems);
         var incrementalRates = this.car.get('incremental_rate_items'),
         selectedIncrementalRates=[];
         for (var i = 0 ; i <incrementalRates.length; i++) {
            if(parseInt($('#addon-'+incrementalRates[i].addon_id).val())>0){
               var incrRates=incrementalRates[i];
               incrRates.number_of_items = parseInt($('#addon-'+incrementalRates[i].addon_id).val());
               selectedIncrementalRates.push(incrementalRates[i]);
            }
         }
         this.carBooking.set('incremental_rate_items',selectedIncrementalRates );
         var pickup_address = this.car.get('pickup_address');
         this.carBooking.set('pickup_address',pickup_address);
         var dropoff_address = this.car.get('dropoff_address');
         this.carBooking.set('dropoff_address',dropoff_address);
         this.carBooking.set('pickup_date', this.car.get('pickup_date'));

         this.carBooking.save({},{
           // contentType:'application/json',
            //type:'POST',
            //beforeSend:_.bind(this.showLoading,this),
            complete:function(model, response) {
              console.log('completed !') ;
          },
            //data:JSON.stringify(queryData),
           success:function(model, response) {
              console.log('Successfully saved!');
          },
          error: function(model, error) {
              console.log(model.toJSON());
              console.log('error.responseText');
          }
         });
      }
      
   });
   return CustomerView;   
});