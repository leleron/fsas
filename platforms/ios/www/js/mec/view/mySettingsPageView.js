define([//'jquery', 
        'underscore', 'backbone','text!page/05-8-1_mySettings.html',
        'mec/model/mySettingsPageModel'
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
          'click .gesturePW':'doGesturePW'
      },
      doGesturePW:function() {
          var flipSwitch = $('#gesture').val();

          if(flipSwitch = "on") {
              //设置打开手势密码标记
              localStorage.setItem("flipSwitch", "on");
              //设置打开手势密码画面的父画面
              localStorage.setItem("parent", "gesture");
              window.AppRouter.showGesturePWPage();
          }else{
              localStorage.setItem("flipSwitch", "off");
              localStorage.setItem("parent", "");
              localStorage.removeItem("gesturePW");
          }
      }
  });
});