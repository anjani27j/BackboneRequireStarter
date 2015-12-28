define([
   'jquery', 
   'backbone', 
   'handlebars', 
   'collections/cars', 
   'text!templates/customer/searchResult.handlebars',
   'datetimepicker'
   ], function($, Backbone, Handlebars, Cars, SearchResultTemplate) {
   var searchResultView = Backbone.View.extend({
      el: '#main-container',
      events: {
         'change #selectService' : 'selectServiceHandler' 
      },
      initialize: function() {
         this.template = Handlebars.compile(SearchResultTemplate);
         this.cars = new Cars();
      },
      render: function() {
      	 this.$el.removeClass('dashboard');
      	 this.$el.addClass('width90'); 
      	 this.$el.addClass('main-container-top-margin');
         this.$el.html(this.template);
         this.$el.find('#sidebar-nav').remove();
         return this;
      },
  });
  return searchResultView;
});