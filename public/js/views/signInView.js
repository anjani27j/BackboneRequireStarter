define(['jquery', 'backbone', 'handlebars', 'text!templates/signIn.handlebars'], 
   function($, Backbone, Handlebars, SignInTemplate) {
   var SignInView = Backbone.View.extend({
      el: '#main-container',
      events: {
      },
      initialize: function() {
         this.template = Handlebars.compile(SignInTemplate);
         this.render();
      },
      render: function() {
         this.$el.html(this.template());
         $('#signinBtn').off().on('click', function(e){
            $('#validation-error').hide();
            if($('#user_email').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('Username is mandatory fields.');
            }else if($('#user_password').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('Password is mandatory fields.');
            }else{
               Backbone.history.navigate("", {trigger: true});
               Backbone.history.navigate("", {trigger: true});
            }
         });
         return this;
      }
   });
   return SignInView;   
});