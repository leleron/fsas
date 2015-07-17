define([//'jquery', 
        'underscore', 'backbone','text!page/03-1-2_scanQRcode.html',
        'mec/model/scanQRcodePageModel'
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
    }
  });
});