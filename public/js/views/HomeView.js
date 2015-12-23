define(['jquery', 'backbone', 'handlebars', 'collections/tweet', 'text!templates/search.handlebars'], function($, Backbone, Handlebars, Tweets, SearchTemplate) {

   var HomeView = Backbone.View.extend({
      
      //el: '#main',
      events: {
      },

      initialize: function() {
         this.template = Handlebars.compile(SearchTemplate);
         this.collection = new Tweets();
         this.listenTo(this.collection, 'reset add change remove', this.render, this);
         var self = this;
         this.collection.fetch({
            success: function(){debugger;
               self.render();
            }
         });
      },

      render: function() {
         this.$el.html(this.template(this.collection.toJSON()[0]));
         return this;
      }
   });
   return HomeView;   
});