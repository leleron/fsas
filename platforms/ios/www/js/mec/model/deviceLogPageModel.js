define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"deviceLogPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("deviceLogPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },
            getdeviceLogs:function(handlerId,source,date,option){            	
                var _this = this;               
                //从localStorage中获取tokenId
                var tokenId = localStorage.getItem("tokenId");
                //从localStorage中获取设备的ID
                var thisDeviceId=localStorage.getItem("thisDeviceId");
                alert("thisDeviceId:"+thisDeviceId+","+"tokenId:"+tokenId+","+"handlerId:"+handlerId+","+"source:"+source+","+"date:"+date);
                $.ajax({
                    type:"post",
                    dataType:"json",
                    url:"http://121.40.104.203:8080/UserCore/service/devices/"+thisDeviceId+"/log ",
                    data:JSON.stringify({date:date,TOKENID:tokenId,handlerId:handlerId,source:source}),
                    success:function(data) {                     	
                		if(data.status=="SUCCESS"||data.status=="EMPTY"){                 			
                			_this.set('dataLog',data);
                            option.onSuccess(data);
                		}else if(data.status=="FAILURE"){                			
                			option.onFailure(data.message);
                		}                       		                       	                       
                    },
	                error:function(XMLHttpRequest, textStatus, errorThrown) { 		                	
	                    option.onFailure(textStatus);
	               }
                });
            },
            getDeviceHandler:function(option){
                var _this = this;
                $.ajax({
                    type:"get",
                    dataType: "json",
//                    url:"http://localhost:8080/server.php",
//                    data:{gid:"deviceHandler",},
                    url:"https://api.thinkpage.cn/v2/weather/all.json",
                    data:{city:"CHBJ000000",language:"zh-chs",unit:"c",aqi:"city",key:"7VDYKSS00N"},
                    success:function(data) {
                    	data = {"status":"0","error_message":"","handlers":[{"handlerId":"1","handlerNmae":"\u64cd\u4f5c\u80051"},{"handlerId":"2","handlerNmae":"\u64cd\u4f5c\u80052"},{"handlerId":"3","handlerNmae":"\u64cd\u4f5c\u80053"}]};
                        _this.set('dataHandler',data);
                        option.onSuccess(data);
                    }
                });
            }
        });
});