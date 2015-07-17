define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"loginPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("loginPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },
                
            checkLogin : function(option) {
                var account=$('#account').val();
                var password=$('#password').val();
                $.ajax({
                    type:"post",
                    dataType: "json",
                    url:"http://121.40.104.203:8080/UserCore/service/user/loginIn",
                    data:JSON.stringify({LOGINID:account,PASSWORD:password}),
                    success:function(data) {
                        if (data.status == "SUCCESS") {
                        	alert("11111"+"!!!!!!!!!"+data.tokenId);
                            option.onSuccess(data.tokenId);
                        }else{
                            option.onFailure(data.message);
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown) {
                        option.onFailure(textStatus);
                    }
                });
            }
        });
});