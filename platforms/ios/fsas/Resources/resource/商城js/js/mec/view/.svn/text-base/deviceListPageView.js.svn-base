define([//'jquery', 
        'underscore', 'backbone',
        'text!page/03-2-1_deviceSearchResult.html',
        'mec/model/deviceListPageModel'
        ],
    function(//$,
            _, Backbone,
            mainView,
            mainModel){
        return cpmView = Backbone.View.extend({
            template:_.template(mainView),
            _el: $("#thelist"),
            initialize : function() {
            },
            refresh: function(){
            },
            render: function(){
                $(this.el).empty();
                $(this.el).html(this.template(this.model.toJSON()));

                //从数据模型中取得设备信息
                var deviceList = this.model.get('data').deviceinfo;
                //alert(JSON.stringify(deviceList));

                var deviceListHtml = "";

                for(i=0;i<deviceList.length;i++){
                    deviceListHtml +=
                        "    <li>"+
                        "        <a href='#' id='"+deviceList[i].id+"' class='"+deviceList[i].className+"' data-deviceid='"+deviceList[i].id+"'>"+
                        "            <img src='images/"+deviceList[i].imgSrc+"'><h2>"+deviceList[i].deviceName+"</h2>"+
                        "        </a>"+
                        "    </li>";
                }
                //清除ul下所有的子节点
                $(this.el).find("#thelist").empty();
                //将生成好的HTML插入ul
                $(this.el).find("#thelist").append(deviceListHtml);
                return this;
            },
            events: {
                'click .item_name':'showNameCardPage'
            },
            showNameCardPage:function(event) {
                //localStorage.setItem("deviceName",event.target.id);
                localStorage.setItem("deviceID",$(event.target).data('deviceid'));
                window.AppRouter.showNameCardPage();
            },
        });
    }
);

