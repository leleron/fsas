define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"miscellaneousPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("miscellaneousPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },
                
                getServicePhone:function(option){
                	var _this = this;
                	$.ajax({
                        type:"get",
                        dataType: "json",
                        url:"http://121.40.104.203:8080/UserCore/service/find/miscellaneous/CustomerServicePhone",
                        success:function(data) {
                        	if (data) {
                        		_this.set('data',data);                        		
                                option.onSuccess();
                            }else{
                            	alert(data.message);
//                                option.onFailure(data.message);
                            }
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown) {
//                            option.onFailure(textStatus);
                            alert(textStatus);
                        }
                    });
                }
            
        });
});