define([//'jquery',
        'underscore', 'backbone','text!page/04-4-3-1_deviceLog.html',
        'mec/model/deviceLogPageModel'
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

                //日志列表
                var logList='';
                //操作者下拉框option
                var controllerList='';
                //操作者
                var handles=new Array();
                //筛选时间
                var logTime='';

                //页面初始化时的筛选时间
                var now = new Date();
                var year = now.getFullYear();       //年
                var month = now.getMonth() + 1;     //月
                var day = now.getDate();            //日
                if(month<10){
                    month="0"+month;
                };
                if(day<10){
                    day="0"+day;
                };
                logTime="<span><input type=\"text\" name=\"yearName\" id=\"yearId\" value='"+year+"'/></span>"+
                "<span><input type=\"text\" name=\"monthName\" id=\"monthId\" value='"+month+"'/></span>"+
                "<span><input type=\"text\" name=\"dayName\" id=\"dayId\" value='"+day+"'/></span>";
                $(this.el).find("#logTime").append(logTime);

                var status=this.model.get('dataLog').status;
                
                if(status=="SUCCESS"){
                	//该设备当天所有log
                    var deviceLogs=this.model.get('dataLog').deviceLogList;
                    for(var i=0;i<deviceLogs.length;i++){                               
                        logList+=
                            "<li><h6>"+deviceLogs[i].logTime+"<h6><p>"+deviceLogs[i].logContent+"</li>";                
                    };
                    
                };
                
                //该设备所有的主控副控
                var handlerList=this.model.get('dataHandler').handlers;
                for(var i=0;i<handlerList.length;i++){
                    controllerList+="<option value='"+handlerList[i].handlerId+"'>"+handlerList[i].handlerNmae+"</option>";
                };

                $(this.el).find("#deviceLogs").append(logList);
                $(this.el).find("#controller").append(controllerList);


                return this;
            },

            events: {
                'click #searchLog':'showDeviceFilterResult',
                'click #filter':'doDeviceFilterResult'

            },
            showDeviceFilterResult:function(){
                var handlerId=$("#controller").val();
                var source=$("#controlSource").val();
                var year=$("#yearId").val();
                var month=$("#monthId").val();
                var day=$("#dayId").val();
                var date=year+""+month+""+day;
                window.AppRouter.showDeviceLogPage(handlerId,source,date);
            },
            doDeviceFilterResult:function(){
                $("#filterForm").popup("open");
                //this.model.getDeviceHandler({})
            }
        });
    });