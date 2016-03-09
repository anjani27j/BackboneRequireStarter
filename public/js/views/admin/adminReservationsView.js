define([
   'jquery','backbone','bootstrap','handlebars','globalHandlebarsHelper','dataTable','models/adminDashboard','text!templates/admin/adminReservations.handlebars'
   ], function($, Backbone, Bootstrap, Handlebars, GlobalHandlebarsHelper, DataTable, AdminReservationsModel, AdminReservationsTemplate) {
   var AdminReservationsView = Backbone.View.extend({
      el: '#main-container',
      events: {
      },
      initialize: function() {
         this.template = Handlebars.compile(AdminReservationsTemplate);
         this.model = new AdminReservationsModel();
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
            $('#example').DataTable();
            return this;
         }
      }
   });
   return AdminReservationsView;   
});