define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {
        			//data:'',
        		},
        	    modelName:"menuPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("menuPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },
                //在没有网络时掉用本地数据库
                showMenuPageLocal:function(option){
	                 //账号
			   		var password = $(".password").val();
			   		//密码
			   		var username = $(".username").val();
                	select(TABLE_LOGIN,"*","username=? and password = ?",[username,password],function(rows){ 
				        if(rows){
				            option.onSuccess();
				        }  else{
				        	option.onFailure(username,password);
				        	
				        } 
				    }); 
                },
                //网络正常时调用接口
                showMenuPage:function(option){
                //账号
		   		var password = $(".password").val();
		   		//密码
		   		var username = $(".username").val();
		   		//手机号码
		   		var phoneNumber = $(".username").val();
		   		//手机串号
		   		var phoneSequence = "NO87858458";
		   		//调用登录接口  //登录成功返回1失败返回0
		   		alert("99");
		   		login(username,password,phoneNumber,phoneSequence,function (result) {
				 	var objResult = JSON.parse(result);
				 
					if(objResult.flag==1){
						alert("lo");
						localStorage.setItem("credentialNo",objResult.result.credentialNo);
						localStorage.setItem("loginflag","islogin");
						option.onSuccess(username,password);
					}else if(objResult.flag==0){
						navigator.notification.confirm(  
			                objResult.errMsg,  // message  
			          		"",  //方法
			                '提示',           
			                '确定'
			             ); 
						option.onFailure();
						localStorage.removeItem("loginflag");
					}
				
				  });
				  //上传bindingRegId
				//setAlias(localStorage.getItem("credentialNo"),function(result){
//		   			var jsonObject = JSON.parse(result);
//		   			if(jsonObject.flag==1){
//		   				alert("111");
//		   			}else{
//		   				navigator.notification.alert(  
//			                objResult.errMsg,  // message  
//			          		"",  //方法
//			                '提示',           
//			                '确定'
//			             ); 
//		   			}
//		   		});
				 
                }
                
        });
});