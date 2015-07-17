define([//'jquery', 
        'underscore', 'backbone','text!page/05-9-1_feedback.html',
        'mec/model/feedbackPageModel'
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
        'click .submitButton':'showSubmitSuccess'
    },
      showSubmitSuccess: function(){
        window.AppRouter.feedbackSubmitCheck();
      }
});
});