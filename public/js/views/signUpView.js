define(['jquery', 'backbone', 'handlebars', 'text!templates/signUp.handlebars'], 
   function($, Backbone, Handlebars, SignUpTemplate) {
   var SignUpView = Backbone.View.extend({
      el: '#main-container',
      events: {
      },
      initialize: function() {
         this.template = Handlebars.compile(SignUpTemplate);
         this.render();
      },
      render: function() {
         this.$el.html(this.template());
         $('#signupBtn').off().on('click', function(e){
            $('#validation-error').hide();
            if($('#user_email').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('Email is mandatory field.');
            }else if($('#user_password').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('Password is mandatory field.');
            }else if($('#user_password_confirmation').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('Password Confirmation is mandatory field.');
            }else if($('#user_first_name').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('First Name is mandatory field.');
            }else if($('#user_last_name').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('Last Name is mandatory field.');
            }else if($('#user_phone').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('Phone is mandatory field.');
            }else{
               var requestdata = {
                  "user_type": "CUSTOMER",
                  "first_name": "test",
                  "last_name": "user",
                  "email_id": "testuser@gmail.com",
                  "mobile_number": 203893
               }
               $.ajax({
                  url:'http://54.208.111.147:8080/v1/user',
                  type:'POST',
                  data:requestdata,
                  success:function(){},
                  error:function(){}
               });
               Backbone.history.navigate("", {trigger: true});
            }
         });
         return this;
      }
   });
   return SignUpView;   
});