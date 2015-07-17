define([//'jquery', 
        'underscore', 'backbone','text!page/05-1-3_registVeri.html',
        'mec/model/registPageModel'
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
        'click .sendCode':'sendCode',
        'click .userRegist':'userRegist'
    },

      sendCode:function(){
          this.model.sendCode();
      },
      userRegist:function(){
          this.model.userRegist();
      }


  });
});