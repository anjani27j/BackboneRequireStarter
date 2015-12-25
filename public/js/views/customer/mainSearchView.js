define([
   'jquery', 
   'backbone', 
   'handlebars', 
   'models/search', 
   'text!templates/mainSearch.handlebars'
   ], function($, Backbone, Handlebars, Search, SearchTemplate) {
   var mainSearchView = Backbone.View.extend({
      el: '#main-container',
      events: {
      },
      initialize: function() {
         debugger;
         this.template = Handlebars.compile(SearchTemplate);
         this.model = new Search();
      },
      render: function() {
         debugger;
         this.$el.html(this.template);
         return this;
      }
   });
   return HomeView;   
});