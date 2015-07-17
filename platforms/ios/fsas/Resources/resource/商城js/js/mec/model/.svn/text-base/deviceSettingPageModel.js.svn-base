define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"deviceSettingPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("deviceSettingPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },
                //定时开关
                deviceTiming:function(status){
                    var _this = this;
                },
                //控制设置
                deviceControl:function(status){
                	setDeviceSettingSwitch(status, 2);
                },
                //分享设置
                deviceShare:function(status){
                	setDeviceSettingSwitch(status, 3);
                },
                //获取开关设置状态
                getDeviceSettingSwitch:function(option) {
                	var _this = this;
                	 //从数据模型中获得设备名
                    var tokenId = localStorage.getItem("tokenId");
                    //设备名ID
                    var thisDeviceId = "1";
//                    var thisDeviceId = localStorage.getItem("thisDeviceId");
                    $.ajax({
                        type:"get",
                        dataType: "json",
                        url:"http://121.40.104.203:8080/UserCore/service/devices/" + thisDeviceId + "/settings?tokenId="+tokenId,
                        success:function(data) {
                        	if (data) {
                                _this.set('data', data);
                                option.onSuccess(data);
                            } else {
                                option.onFailure(data.message);
                            }
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown) {
                        	alert(textStatus);
                        	option.onFailure(textStatus);
                        }
                    });
                }
        });
        //设置开关状态
        function setDeviceSettingSwitch(status, types) {
        	var _this = this;
            //从数据模型中获得设备名
            var tokenId = localStorage.getItem("tokenId");
            //设备名ID
            var thisDeviceId = "1";
//            var thisDeviceId = localStorage.getItem("thisDeviceId");
            $.ajax({
                type:"post",
                dataType: "json",
                url:"http://121.40.104.203:8080/UserCore/service/devices/" + thisDeviceId + "/settings",
                data:JSON.stringify({TOKENID:tokenId, SETTINGSTATUS:status, SETTINGTYPE:types}),
                success:function(data) {
                	alert(data.message);
                },
                error:function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
        }
});