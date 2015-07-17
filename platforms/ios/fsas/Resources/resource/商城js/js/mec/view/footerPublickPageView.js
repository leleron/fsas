define([//'jquery', 
        'underscore', 'backbone','text!page/00-0-0_footPublicPage.html'
        ], 
function(//$, 
		_, Backbone, footView){

  return cpmView = Backbone.View.extend({
	  
    template:_.template(footView),
   
    initialize : function() {
    	
    },
    
    refresh: function(){
    	
    },
    
    render: function(){
     
      $(this.el).html(this.template());
      return this;
    },
    
    events: {
      // 'click #cpm_ind #addPro':'initAddProPage',
    }
  });
});