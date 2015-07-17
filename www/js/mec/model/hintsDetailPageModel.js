define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"hintsDetailPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("hintsDetailPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },

                getTipsList: function(option){
                    var _this = this;
                    $.ajax({
                        type:"get",
                        dataType: "json",
                        url:"https://api.thinkpage.cn/v2/weather/all.json?city=CHBJ000000&language=zh-chs&unit=c&aqi=city&key=7VDYKSS00N",
                        data:{},
                        success:function(data) {
                        	data = {"status":"0","error_message":"","tipsList":[{"id":"tip1","tipContent":"\u5c0f\u7a8d\u95e81"},{"id":"tip2","tipContent":"\u5c0f\u7a8d\u95e82"},{"id":"tip3","tipContent":"\u5c0f\u7a8d\u95e83"}]};
                            _this.set('data',data);
                            option.onSuccess(data);
                        }
                    });
                }
        });
});