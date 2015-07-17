define([//'jquery', 
        'underscore', 'backbone','text!page/03-6-2-1_spotsNearby.html',
        'mec/model/spotsNearbyPageModel'
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

        var mySpot = this.model.get('data').spotsNearby;
        var mySpotList = "";
        for(var i=0;i<2;i++){
            mySpotList +=
                "<li data-icon='false'>"+
                "<h1>"+mySpot[i].spotName+"</h1>"+
                "<p>"+"<span>"+mySpot[i].spotAddress+"</span>"+"</p>"+
                "<p>"+mySpot[i].spotPhone+"</p>"+
                "<p class='ui-li-aside'>"+mySpot[i].spotDistance+"</p>"+
                "</li>"
        }
        $(this.el).find("#spotListView").append(mySpotList);

        return this;
    },
      events: {
          'click .miscellaneousPage':'showMiscellaneousPage'
      },
      showMiscellaneousPage:function(){
          window.AppRouter.showMiscellaneousPage();
      }

  });
});