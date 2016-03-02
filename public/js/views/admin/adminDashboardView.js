define([
   'jquery','backbone','bootstrap','handlebars','globalHandlebarsHelper','models/adminDashboard','text!templates/admin/adminDashboard.handlebars'
   ], function($, Backbone, Bootstrap, Handlebars, GlobalHandlebarsHelper, AdminDashboardModel, AdminDashboardTemplate) {
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
            $('[id^=detail-]').hide();
            $('.toggle').click(function() {
               $input = $( this );
               $target = $('#'+$input.attr('data-toggle'));
               $target.slideToggle();
               if($( this ).find('#dropdownArrow').hasClass('fa-chevron-right')){
                  $( this ).find('#dropdownArrow').removeClass('fa-chevron-right').addClass('fa-chevron-down');
                  $( this ).find('#dropdownArrow').parent()[0].style.background='blue'
               }else{
                  $( this ).find('#dropdownArrow').removeClass('fa-chevron-down').addClass('fa-chevron-right');
                  $( this ).find('#dropdownArrow').parent()[0].style.background='red'
               }
               
            });
            $("a[href='#dashboard']").append('<div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>')
            $('#sidebar-nav').show();
            return this;
         }
      }
   });
   return AdminDashboardView;   
});