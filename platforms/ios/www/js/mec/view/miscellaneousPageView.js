define([//'jquery', 
        'underscore', 'backbone','text!page/03-6-1_miscellaneous.html',
        'mec/model/miscellaneousPageModel'
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
      
      var servicePhoneNum = this.model.get('data').result;
      alert(">>>>>>>>>"+servicePhoneNum);
      $(this.el).find("#servicePhone").text(servicePhoneNum.CustomerServicePhone)
//      alert("servicePhoneNum:"+servicePhoneNum);
//      $(this.el).find("#servicePhone").innerHTML(servicePhoneNum.CustomerServicePhone);
//      this.model.getServicePhone({
//    	  onSuccess:function(result) {
//    		  alert(">>>>>"+result.CustomerServicePhone);
//              $(this.el).find("#servicePhone").text(servicePhoneNum);
//          },
//          onFailure:function(msg) {
//              alert(msg);
//          }
//      });
      return this;
    },
      events: {
          'click .findPage':'showFindPage'
      },
      showFindPage:function(){
          window.AppRouter.showFindPage();
      }

  });
});