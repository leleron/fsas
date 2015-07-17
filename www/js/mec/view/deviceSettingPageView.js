define([//'jquery',
        'underscore', 'backbone','text!page/04-4-5-1_deviceSetting.html',
        'mec/model/deviceSettingPageModel'
    ],
    function(//$,
        _, Backbone, mainView,mainModel){

        return cpmView = Backbone.View.extend({

            template:_.template(mainView),

            initialize : function() {
            	
            },

            refresh: function(){
            	
            },

            render: function(){
                $(this.el).empty();
                $(this.el).html(this.template(this.model.toJSON()));
                var switchInfo = this.model.get('data').result;
                if (typeof(switchInfo) == "undefined") { return this; }
                // 定时开关
                var switchTiming = $(this.el).find(".switch-timing");
                // 控制设置
                var switchControl = $(this.el).find(".switch-control");
                // 分享设置
                var switchShare = $(this.el).find(".switch-share");
	            $.each(switchInfo, function(i) {
                	var settingType = Number(switchInfo[i].settingType);
                	var settingStatus = Number(switchInfo[i].settingStatus);
                	switch(settingType) {
	                    case 1: // 定时开关
	                        
	                        break;
	                    case 2: // 控制设置
	                    	changeStatus(switchControl, settingStatus);
	                      break;
	                    case 3: // 分享设置
	                    	changeStatus(switchShare, settingStatus);
	                        break;
	                    default:
	                        break;
                	}
                });
                return this;
            },

            events: {
                'change #switchTiming':'deviceTiming',
                'change #switchControl':'deviceControl',
                'change #switchShare':'deviceShare'
            },

            deviceTiming:function(){
                window.AppRouter.setDeviceSettingPage(0, $("#switchTiming").val());
            },
            deviceControl:function(){
                window.AppRouter.setDeviceSettingPage(1, $("#switchControl").val());
            },
            deviceShare:function(){
                window.AppRouter.setDeviceSettingPage(2, $("#switchShare").val());
            }
        });
        
        // 设置开关切换状态
        function changeStatus(obj, settingStatus) {
        	if (settingStatus == 0) {
        		obj.find("option").eq(0).prop("selected",true);
        		obj.find(".ui-slider-label-a").attr("style", "width:0%");
        		obj.find(".ui-slider-label-b").attr("style", "width:100%");
        		obj.find("a").attr("style", "left:0%;");
        		obj.find("a").attr("aria-valuenow", "0");
            } else {
            	obj.find("option").eq(1).prop("selected",true);
            	obj.find(".ui-slider-label-a").attr("style", "width:100%");
            	obj.find(".ui-slider-label-b").attr("style", "width:0%");
            	obj.find("a").attr("style", "left:100%;");
            	obj.find("a").attr("aria-valuenow", "1");
            }
        }
    });