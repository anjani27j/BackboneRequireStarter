define([
   'jquery','backbone','handlebars','globalHandlebarsHelper','models/adminOrderDetails','text!templates/admin/adminOrderDetails.handlebars'
   ], function($, Backbone, Handlebars, GlobalHandlebarsHelper, AdminOrderDetailsModel, AdminOrderDetailsTemplate) {
   var AdminOrderDetailsView = Backbone.View.extend({
      el: '#main-container',
      events: {
      },
      initialize: function() {
         this.template = Handlebars.compile(AdminOrderDetailsTemplate);
         this.model = new AdminOrderDetailsModel();
         var self = this;
         this.model.fetch({
            success: function(){
               self.render();
            }
         });
      },
      render: function() {
         if(!_.isEmpty(this.model.attributes)){
            $('#sidebar-nav').show();
            $('#dashboard-menu li').removeClass('active');
            $("a[href='#reservations']").parent().addClass('active');
            this.$el.html(this.template({data:this.model.attributes}));
            return this;
         }
      }
   });
   return AdminOrderDetailsView;   
});