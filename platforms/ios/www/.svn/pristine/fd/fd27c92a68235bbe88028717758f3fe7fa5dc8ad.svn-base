define(['backbone', 'underscore','localstorage'],
    function(Backbone, _) {
        return Backbone.Model.extend({
            defaults: {},
            modelName:"myInfoEditNamePageModel",
            fetchFromLocalStorageSuccessfull:false,
            initialize : function() {
                var _this = this;
            },
            
            editName:function(option){
            	var _this = this;
            	var tokenId = localStorage.getItem('tokenId');
            	alert(+"???"+tokenId);
            	var userName = $("#nameEdit").val();
            	alert(userName);
//            	var nickname = localStorage.getItem('nickname');
            	$.ajax({
                    type:"put",
                    dataType: "json",
                    url:"http://121.40.104.203:8080/UserCore/service/user/"+tokenId,
                    data:JSON.stringify({USER_NAME:userName}),
                    success:function(data) {
                        if (data) {
                            _this.set('data',data);
                            option.onSuccess(data);
                        } else {
                            option.onFailure(data.message);
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown) {
                    	alert(+"!!!!!!!"+textStatus);
                        option.onFailure(textStatus);
                    }
                });
            }
        });
    });
