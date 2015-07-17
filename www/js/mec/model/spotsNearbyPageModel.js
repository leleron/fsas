define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"spotsNearbyPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("spotsNearbyPageModel"),

                data:{
                    spotsNearby:''
                },
        	    
                initialize : function() {
                	var _this = this;
                },

                getSpots: function(option){
                    var _this = this;
                        $.ajax({
                            type:"get",
                            dataType: "json",
                            url:"https://api.thinkpage.cn/v2/weather/all.json?city=CHBJ000000&language=zh-chs&unit=c&aqi=city&key=7VDYKSS00N",
                            data:{},
                            success:function(data) {
                            	data = {"status":"0","error_message":"","spotsNearby":[{"id":"spotsNearby1","spotName":"\u98de\u79d1\u4e0a\u6d77\u5e02\u957f\u5b81\u533a\u7ef4\u4fee\u7f51\u70b9","spotAddress":"\u4e0a\u6d77\u5e02\u957f\u5b81\u533a\u67d0\u533a\u67d0\u8def\u67d0\u53f7","spotPhone":"021-87563240","spotDistance":"325m","spotLongitude":"longitude","spotLatitude":"latitude"},{"id":"spotsNearby2","spotName":"\u98de\u79d1\u4e0a\u6d77\u5e02\u8679\u53e3\u533a\u7ef4\u4fee\u7f51","spotAddress":"\u4e0a\u6d77\u5e02\u8679\u53e3\u533a\u67d0\u8def\u67d0\u53f7","spotPhone":"021-87654321","spotDistance":"1100m","spotLongitude":"longitude","spotLatitude":"latitude"}]};
                                _this.set('data',data);
                                option.onSuccess(data);
                                }
                        });
                }
        });
});