define(['jquery', 'backbone', 'handlebars', 'text!templates/forgotPwd.handlebars'], 
   function($, Backbone, Handlebars, ForgotPwdTemplate) {
   var ForgotPwdView = Backbone.View.extend({
      el: '#main-container',
      events: {
      },
      initialize: function() {
         this.template = Handlebars.compile(ForgotPwdTemplate);
         this.render();
      },
      render: function() {
         this.$el.html(this.template());
         $('#resetPwdBtn').off().on('click', function(e){
            $('#validation-error').hide();
            if($('#user_email').val()==''){
               $('#validation-error').show();
               $('#validation-error').text('Email is mandatory field.');
            }else{
               Backbone.history.navigate("", {trigger: true});
            }
         });
         return this;
      }
   });
   return ForgotPwdView;   
});