define([//'jquery', 
        'underscore', 'backbone','text!page/03-1-1_findIndex.html',
        'mec/model/findPageModel'
        ], 
function(//$, 
		_, Backbone, mainView,mainModel){

  return cpmView = Backbone.View.extend({
	  
    template:_.template(mainView),
   
    initialize : function() {
    	
    },
    
    refresh: function(){
    	
    },
    
    render: function(){
      $(this.el).empty();
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    
    events: {
        'click .nameCard':'showNameCardPage',
        'click #searchDevice':'showDeviceListPage',
        'click .nearby':'showDeviceNearbyPage',
        'click .miscellaneous':'showMiscellaneousPage',
        'click .followRank':'showFollowRankPage',
        'click .nameCard':'showScanQrcodePage'
    },
      showNameCardPage:function(){
          window.location.href="#nameCard";
      },
      showDeviceListPage:function(){
          window.AppRouter.showDeviceListPage($('#devicename').val());
      },
      showDeviceNearbyPage:function(){
          window.location.href="#nearby";
      },
      showMiscellaneousPage:function(){
          window.location.href="#miscellaneous";
      },
      showFollowRankPage:function(){
          window.location.href="#followRank";
      },
      showScanQrcodePage:function(){
          window.AppRouter.showScanQrcodePage();
      }
  });
});