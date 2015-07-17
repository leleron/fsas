define(['backbone', 'underscore','localstorage'],
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"myDevicePageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,

        	    localStorage: new Backbone.LocalStorage("myDevicePageModel"),
                
                initialize : function() {
                	var _this = this;
                },
                getMyDeviceInfo:function(option){               
                	var _this = this;
                	//从localStorage中获取tokenId
                    var tokenId = localStorage.getItem("tokenId");   
                    if(tokenId==""||tokenId==null){
                    	alert("请先登录！");
                    }else{
                    	$.ajax({
                            type:"get",
                            dataType:"json",
                            url:"http://121.40.104.203:8080/UserCore/service/devices/"+tokenId,
                            success:function(data) {                            	
                            		if(data.OwnedStatus=="SUCCESS"){
                            			_this.set('data',data);                            			
                                        option.onSuccess(data.OwnedMessage);
                            		}else if(data.OwnedStatus=="EMPTY"||data.OwnedStatus=="FAILURE"){
                            			option.onFailure(data.OwnedMessage);
                            		}                       		                       	                       
                                },
                            error:function(XMLHttpRequest, textStatus, errorThrown) {                       	                      
                                option.onFailure(textStatus);
                           }
                        });
                    }                  
                }

        });
});