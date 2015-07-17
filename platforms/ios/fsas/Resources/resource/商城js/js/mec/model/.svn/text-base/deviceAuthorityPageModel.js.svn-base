define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"deviceAuthorityPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("deviceAuthorityPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },
                /*getdeviceOwners:function(ownerId,option){
                var _this = this;
                var thisDeviceId=localStorage.getItem("thisDeviceId");

                $.ajax({
                    type:"get",
                    dataType: "json",
//                    url:"http://localhost:8080/server.php",
//                    data:{gid:"owners"},
                    url:"https://api.thinkpage.cn/v2/weather/all.json",
                    data:{city:"CHBJ000000",language:"zh-chs",unit:"c",aqi:"city",key:"7VDYKSS00N"},
                    success:function(data) {
                    	data = {"status":"0","error_message":"","handlers":[{"handlerId":"1","handlerNmae":"\u64cd\u4f5c\u80051","handlerType":"main","headPortrait":"headPortrait1.PNG"},{"handlerId":"2","handlerNmae":"\u64cd\u4f5c\u80052","handlerType":"assistant","headPortrait":"headPortrait2.PNG"},{"handlerId":"3","handlerNmae":"\u64cd\u4f5c\u80053","handlerType":"assistant","headPortrait":"headPortrait3.PNG"}]};
                        _this.set('data',data);
                        option.onSuccess(data);
                    }
                });
                }*/
                getdeviceOwners:function(ownerId,option){
                    var _this = this;
                    //从localStorage中获取tokenId
                    var tokenId = localStorage.getItem("tokenId");
                    //从localStorage中获取设备的ID
                    var thisDeviceId=localStorage.getItem("thisDeviceId");
                    alert("tokenId>>>>"+tokenId+"thisDeviceId>>>>"+thisDeviceId);
                    if(ownerId==""){
                        $.ajax({
                            type:"get",
                            dataType:"json",
                            url:"http://121.40.104.203:8080/UserCore/service/devices/"+thisDeviceId+"/owners?tokenId="+tokenId,                           
                            success:function(data) {                               	
                        		if(data.status=="SUCCESS"){
                        			_this.set('data',data);                        			
                                    option.onSuccess(data.message);
                        		}else if(data.status=="FAILURE"){
                        			option.onFailure(data.message);
                        		}                       		                       	                       
                            },
	                        error:function(XMLHttpRequest, textStatus, errorThrown) {        
	                        	alert(textStatus);
	                            option.onFailure(textStatus);
	                       }
                        });
                    }else{
                        $.ajax({
                            type:"post",
                            dataType: "json",
//                          url:"http://localhost:8080/server.php",
//                          data:{gid:"owners"},
                            url:"https://api.thinkpage.cn/v2/weather/all.json",
                            data:{city:"CHBJ000000",language:"zh-chs",unit:"c",aqi:"city",key:"7VDYKSS00N"},
                            success:function(data) {
                            	data = {"status":"0","error_message":"","handlers":[{"handlerId":"1","handlerNmae":"\u64cd\u4f5c\u80051","handlerType":"main","headPortrait":"headPortrait1.PNG"},{"handlerId":"2","handlerNmae":"\u64cd\u4f5c\u80052","handlerType":"assistant","headPortrait":"headPortrait2.PNG"},{"handlerId":"3","handlerNmae":"\u64cd\u4f5c\u80053","handlerType":"assistant","headPortrait":"headPortrait3.PNG"}]};
                                _this.set('data',data);
                                option.onSuccess(data);
                            }
                        });
                    }
                    }
        });
});