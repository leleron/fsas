define([//'jquery', 
        'underscore', 'backbone','text!page/04-4-6-1_aboutDevice.html',
        'mec/model/aboutDevicePageModel'
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
                var myDevice = this.model.get('data');
                var myDeviceDtlHtml = "";
                //规格参数HTML
                var specificationsHtml = "";
                //功能参数HTML
                var functionalHtml = "";
                //功能介绍HTML
                var functionIntroductionHtml="";

                //规格参数list
                var specificationsList=myDevice.specifications;
                //功能参数list
                var functionalList=myDevice.functional;
                //功能介绍HTML
                var functionIntroductionList=myDevice.functionIntroduction;

                //遍历规格参数，将其内容转为HTML
                for(var i=0;i<specificationsList.length;i++){
                    specificationsHtml+=specificationsList[i].productSpecificationParam+":"+specificationsList[i].productSpecificationValue+"<br>";
                };
                //遍历功能参数，将其内容转为HTML
                for(var i=0;i<functionalList.length;i++){
                    functionalHtml+=functionalList[i].productFunctionParam+":"+functionalList[i].productFunctionValue+"<br>";
                };
                //遍历功能介绍，将其内容转为HTML
                for(var i=0;i<functionIntroductionList.length;i++){
                    functionIntroductionHtml+=functionIntroductionList[i].functionName+":"+functionIntroductionList[i].functionComments+"<br>";
                };


                myDeviceDtlHtml=
                    "<div class=\"ui-grid-solo\">"+
                    "<div class=\"ui-block-a\" align=\"center\">"+
                    "<a href=\"#\"><img src='./images/mydevicelistTest/"+myDevice.productCode+"Dtl.png"+"'/>"+
                    "</a>"+
                    "</div>"+
                    "</div>"+
                    "<ul data-role=\"listview\">"+
                    "<li data-role=\"list-divider\" data-theme=\"c\">"+
                    "</li>"+
                    "<li>"+
                    "<div class=\"ui-grid-a\">"+
                    "<div class=\"ui-block-a\">"+
                    "<h2>设备主人</h2>"+
                    "</div>"+
                    "<div class=\"ui-block-b\">"+
                    "<p id='"+myDevice.deviceId+"'>"+myDevice.deviceOwner+"</p>"+
                    "</div>"+
                    "</div>"+
                    "</li>"+
                    "<li>"+
                    "<div class=\"ui-grid-a\">"+
                    "<div class=\"ui-block-a\">"+
                    "<h2>二维码</h2>"+
                    "</div>"+
                    "<div class=\"ui-block-b\">"+
                    "<img style=\"with:35px; height: 35px\" id=\"barCode\" src='./images/myDeviceDtl/"+myDevice.barCode+"' ></img>"+
                    "</div>"+
                    "</div>"+
                    "</li>"+
                    "<li>"+
                    "<div class=\"ui-grid-a\">"+
                    "<div class=\"ui-block-a\">"+
                    "<h2>版本信息</h2>"+
                    "</div>"+
                    "<div class=\"ui-block-b\">"+
                    "<p id=\"deviceVersion\">"+myDevice.deviceVersion+"</p>"+
                    "</div>"+
                    "</div>"+
                    "</li>"+
                    "<li>"+
                    "<div class=\"ui-grid-a\">"+
                    "<div class=\"ui-block-a\">"+
                    "<h2>产品信息</h2>"+
                    "</div>"+
                    "<div class=\"ui-block-b\">"+
                    "<p>"+myDevice.information+"</p>"+
                    "</div>"+
                    "</div>"+
                    "</li>"+
                    "<li>"+
                    "<div class=\"ui-grid-a\">"+
                    "<div class=\"ui-block-a\">"+
                    "<h2>规格参数</h2>"+
                    "</div>"+
                    "<div class=\"ui-block-b\">"+
                    "<p>"+specificationsHtml+"</p>"+
                    "</div>"+
                    "</div>"+
                    "</li>"+
                    "<li>"+
                    "<div class=\"ui-grid-a\">"+
                    "<div class=\"ui-block-a\">"+
                    "<h2>功能参数</h2>"+
                    "</div>"+
                    "<div class=\"ui-block-b\">"+
                    "<p>"+functionalHtml+"</p>"+
                    "</div>"+
                    "</div>"+
                    "</li>"+
                    "<li class=\"detail\">"+
                    "<div class=\"ui-grid-a\">"+
                    "<div class=\"ui-block-a\">"+
                    "<h2>功能介绍</h2>"+
                    "</div>"+
                    "<div class=\"ui-block-b\">"+
                    "<p>"+functionIntroductionHtml+"</p>"+
                    "</div>"+
                    "</div>"+
                    "</li>"+
                    "<li data-role=\"list-divider\" data-theme=\"c\"></li>"+
                    "</ul>";
                /*"<div class=\"ui-field-contain\" align=\"center\">"+
                 "<a data-role=\"button\" data-theme=\"b\">购买改设备</a>"+
                 "</div>";*/
                $(this.el).find("#deviceDtl").append(myDeviceDtlHtml);
                return this;
            },

            events: {

            }
        });
    });