define([//'jquery', 
        'underscore', 'backbone','text!page/04-1-1-1_myDeviceList.html',
        'mec/model/myDevicePageModel'
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
        var myDevice = this.model.get('data').OwnedDeviceList;
        var attentionedDevice = this.model.get('data').AttentionedDeviceList;
        localStorage.removeItem('myDeviceList');
        localStorage.setItem('myDeviceList',JSON.stringify(myDevice));
        
        var myDeviceList = "";
        var attentionedDeviceList = "";
        
        for(var i=0;i<myDevice.length;i++){
        	var deviceShowStyle="";
        	if(i%3==0){
        		deviceShowStyle="ui-block-a";
        	}else if(i%3==1){
        		deviceShowStyle="ui-block-b";
        	}else if(i%3==2){
        		deviceShowStyle="ui-block-c";
        	}
            myDeviceList +=
                "<div id='deviceObj"+myDevice[i].deviceId+"' class='"+deviceShowStyle+"' align='center'>"+
                "<a href='#'>"+"<img class='content_image_width' src='./images/mydevicelistTest/"+myDevice[i].productCode+".png"+"'>"+
                "</a>"+
                "<p class='content_text'>"+myDevice[i].deviceName+"</p>"+
                "</div>";	            
        };
        for(var i=0;i<attentionedDevice.length;i++){
        	var deviceShowStyle="";
        	if(i%3==0){
        		deviceShowStyle="ui-block-a";
        	}else if(i%3==1){
        		deviceShowStyle="ui-block-b";
        	}else if(i%3==2){
        		deviceShowStyle="ui-block-c";
        	}
        	attentionedDeviceList +=
                "<div id='attentionedObj"+myDevice[i].deviceId+"' class='"+deviceShowStyle+"' align='center'>"+
                "<a href='#'>"+"<img class='content_image_width' src='./images/mydevicelistTest/"+myDevice[i].productCode+".png"+"'>"+
                "</a>"+
                "<p class='content_text'>"+myDevice[i].deviceName+"</p>"+
                "</div>";	
        };
        $(this.el).find("#myDeviceDiv").append(myDeviceList);
        $(this.el).find("#attentionedDeviceDiv").append(attentionedDeviceList);
        ////
        ////for(var i=9;i<myDevice.length;i++){
        ////    myDeviceList1 +=
        ////        "<div id='"+myDevice[i].id+"' class='"+myDevice[i].divClass+"' align='center' myDeviceId='"+myDevice[i].id+"'>"+
        ////        "<a href='#'>"+"<img class='content_image_width' src='./images/mydevicelist/"+myDevice[i].imgSrc+"'>"+
        ////        "<p class='"+myDevice[i].pClass+"'>"+"3"+"</p>"+
        ////        "</a>"+
        ////        "<p class='content_text'>"+myDevice[i].deviceName+"</p>"+
        ////        "</div>";
        ////}
        ////$(this.el).find("#slide2").append(myDeviceList1);
        //var $swiperArea = $(this.el).find(".swiper-wrapper");
        //var $swiperSlide = $("<div class='swiper-slide'></div>");
        //var swiperSlideHtml = "";
        //for(var i = 0;i< myDevice.length;i++){
        //    swiperSlideHtml +=
        //        "<div id='"+myDevice[i].id+"' class='"+myDevice[i].divClass+"' align='center' myDeviceId='"+myDevice[i].id+"'>"+
        //        "<a href='#'>"+"<img class='content_image_width imgwidth' src='./images/mydevicelist/"+myDevice[i].imgSrc+"'>"+
        //        "<p class='"+myDevice[i].pClass+"'>"+"3"+"</p>"+
        //        "</a>"+
        //        "<p class='content_text'>"+myDevice[i].deviceName+"</p>"+
        //        "</div>";
        //    if(i>0 && ((i+1)%9==0 || i == myDevice.length - 1)){
        //        $swiperSlide = $("<div class='swiper-slide'></div>");
        //        $swiperSlide.append(swiperSlideHtml);
        //        $swiperArea.append($swiperSlide);
        //        swiperSlideHtml = "";
        //    }
        //}
        return this;
    },

    events: {
    }

  });
});