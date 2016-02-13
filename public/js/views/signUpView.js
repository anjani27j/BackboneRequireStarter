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
                  "firstName": $('#user_first_name').val().trim(),
                  "lastName": $('#user_last_name').val().trim(),
                  "emailId": $('#user_email').val().trim(),
                  "userName": $('#user_email').val().trim(),
                  "password": $('#user_phone').val().trim()
                }
               $.ajax({
                  //url : "/signUp",
                  url : "http://54.208.111.147:8080/v1/signUp",
                  type: "POST",
                  headers: {'accept' : 'application/json;charset=UTF-8','content-type' : 'application/json'},
                  data : JSON.stringify(requestdata),
                  success: function(data, textStatus, jqXHR){
                    if(data.userId){
                      //Backbone.history.navigate("#myAccount", {trigger: true});
                      $('#loggedinUsername').html(data.firstName+' '+data.lastName+'<b class="caret"></b>');
                      window.isUserLogged = true;
                      Backbone.history.navigate("", {trigger: true});
                    }
                       //data - response from server
                  },
                  error: function (jqXHR, textStatus, errorThrown){
                
                  }
               });
               
               //Backbone.history.navigate("", {trigger: true});
            }
         });
         return this;
      }
   });
   return SignUpView;   
});