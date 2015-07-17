define([//'jquery', 
        'underscore', 'backbone','text!page/05-3-2_userMessageDetail.html',
        'mec/model/userMessagePageModel'
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
          'click .userMessageDetail':'showUserMessageDetailPage'
      },
      showUserMessageDetailPage:function(){
          window.AppRouter.showUserMessageDetailPage();
      }

  });
});