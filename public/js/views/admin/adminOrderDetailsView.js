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
            this.$el.html(this.template({data:this.model.attributes}));
            $("a[href='#reservations']").append('<div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>')
            $('#sidebar-nav').show();
            return this;
         }
      }
   });
   return AdminOrderDetailsView;   
});