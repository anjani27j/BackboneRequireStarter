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
         return this;
      }
   });
   return SignUpView;   
});