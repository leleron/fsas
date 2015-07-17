define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
    return Backbone.Model.extend({
		defaults: {},
	    modelName:"myInfoPageModel",
    	fetchFromLocalStorageSuccessfull:false,
        initialize : function() {
            var _this = this;
        },
        getMyInfo:function(option) {
            var _this = this;
            //从数据模型中获得设备名
            var tokenId = _this.get('tokenId');
            //使用AJAX从服务器获得数据
            $.ajax({
                type:"get",
                dataType: "json",
                url:"http://121.40.104.203:8080/UserCore/service/user/"+tokenId,
                success:function(data) {
                    if (data) {
                        _this.set('data',data);
                        option.onSuccess(data);
                    } else {
                        option.onFailure(data.message);
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown) {
                    option.onFailure(textStatus);
                }
            });
        },
        
        doLogOut:function(option){
        	var _this = this;
        	var tokenId = localStorage.getItem('tokenId');
        	alert("tokenId"+">>>>>>>"+tokenId);
        	$.ajax({
        		type:"delete",
        		dataType:"json",
        		url:"http://121.40.104.203:8080/UserCore/service/user/loginOut",
        		data:JSON.stringify({TOKENID:tokenId}),
        		success:function(data) {
                    if (data.status=="SUCCESS") {
                        option.onSuccess(data.message);
                    } else {
                        option.onFailure(data.message);
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown) {
                    option.onFailure(textStatus);
                    alert(textStatus);
                }
        	});
        }
    });
});
