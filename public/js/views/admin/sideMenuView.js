define([
   'jquery', 
   'backbone', 
   'handlebars', 
   'text!templates/admin/sideMenu.handlebars'
   ], function($, Backbone, Handlebars, SideMenuTemplate) {
   var SideMenuView = Backbone.View.extend({
      el: '#sidebar-nav',
      events: {
      },
      initialize: function() {
         this.template = Handlebars.compile(SideMenuTemplate);
      },
      render: function() {
         this.$el.html(this.template);

         //bind chevron clicks
         $('.dropdown-toggle').off().on('click',function(e){
            e.stopPropagation();
            e.preventDefault();
            if($(this.parentElement).hasClass('active')){
               $(this.parentElement).removeClass('active');
               $(this.parentElement.children[1]).hide();
            }else{
               $(this.parentElement).addClass('active');
               $(this.parentElement.children[1]).show();
            }
            
         })
         return this;
      }
   });
   return SideMenuView;   
});