define([
   'jquery','backbone','handlebars','models/adminDashboard','text!templates/admin/adminDashboard.handlebars'
   ], function($, Backbone, Handlebars,AdminDashboardModel,AdminDashboardTemplate) {
   var AdminDashboardView = Backbone.View.extend({
      el: '#main-container',
      events: {
      },
      initialize: function() {
         this.template = Handlebars.compile(AdminDashboardTemplate);
         this.model = new AdminDashboardModel();
         var self = this;
         this.model.fetch({
            success: function(){
               self.render();
            }
         });
      },
      render: function() {
         if(!_.isEmpty(this.model.attributes)){
            this.$el.html(this.template({data:this.model.attributes}));
            $("a[href='#dashboard']").append('<div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>')
            $('#sidebar-nav').show();
            return this;
         }
      }
   });
   return AdminDashboardView;   
});