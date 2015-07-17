$(function () {

    $.afui.launch();

    // 商品首页
    $("#mallIndex").on("panelload", function (e) {
        hlp.log("before call get mall index");
        svc.getMallIndex(function(r) {
            if (r.status == "SUCCESS") {
                // 轮播图
                getIndexLoop(r.data.index_loop);
                // 热卖商品
                getHotProduct(r.data.index_hot_product);
                // 特价产品
                getBargainPriceProduct(r.data.index_dis_product);
                //明星产品
                getStarProduct(r.data.index_star_product);
                //新品上市
                getNewList(r.data.index_new_product);
                $(".ta").off("tap").on("tap", function () {
                    var goods_sn = $(this).attr("goods_sn");
                    var salesType = "0";
                    hlp.panelObj["commodityDetails"] = { "sn": goods_sn ,"sales_type":salesType};
                    $.afui.loadContent("#commodityDetails1");
                });
            } else {
                hlp.myalert(r.message);
            }
        });

        //搜索商品
        $(".headSearchIcon").off("tap").on("tap",function(){
            hlp.log("before getGoodsSearch request...");
            var searchKey = $("#headSearch").val();
            svc.getGoodsSearch(searchKey,function(r){
                if(r.status == "SUCCESS"){
                    hlp.bindtpl(r.data,"#searchResultList","tpl_searchResultList");
                    $(".srl").off("tap").on("tap", function () {
                        var goods_sn = $(this).attr("id");
                        var salesType = "0";
                        hlp.panelObj["commodityDetails"] = { "sn": goods_sn ,"sales_type":salesType};
                        $.afui.loadContent("#commodityDetails1");
                    });

                    var catId = r.data[0].cat_id;
                }else{
                    $("#searchResultList").text(r.message);
                    var catId = "";
                }
                //获取底部的推荐商品
                svc.getPersonHots(catId,function(r){
                    hlp.log("inside getPersonHots request...!!!!!!!!!!!");
                    if(r.status == "SUCCESS"){
                        hlp.bindtpl(r.data,"#searchResultRecommend","tpl_searchResultRecommend");
                        $(".srr").off("tap").on("tap", function () {
                            var thisId = $(this).attr("id");
                            var goods_sn =  thisId.substring(3,thisId.length);
                            var salesType = "0";
                            hlp.panelObj["commodityDetails"] = { "sn": goods_sn ,"sales_type":salesType};
                            $.afui.loadContent("#commodityDetails1");
                        });
                    }else{
                        hlp.myalert(r.message);
                    }
                });

                $.afui.loadContent("#mallSearchResult");
            });
        });
    });

    // 团购
    $("#groupon").on("panelload", function (e) {
        hlp.log("before call get group shopping");
        svc.groupShopping(function(r) {
            if (r.status == "SUCCESS") {
                $.each(r.data, function(index) {
                    r.data[index].goods_thumb = imgDomain + r.data[index].goods_thumb;
                });
                hlp.bindtpl(r.data, "#tuanInfo", "tpl_groupshopping");
                $(".groupImg img").off("tap").on("tap", function () {
                    var id = $(this).attr("id");
                    var salesType = "3";
                    hlp.panelObj["commodityDetails"] = { "sn": id , "sales_type":salesType};
                    $.afui.loadContent("#commodityDetails1");
                });
                $(".tuanBtn").off("tap").on("tap", function () {
                    var goodSn = $(this).attr("sn");
                    var sku_sn = $(this).attr("sku_sn");
                    hlp.panelObj["goods"] = {"good":[{ "sku_sn":sku_sn, "sn":goodSn, "num": 1 }],"isCart":"0"};
                    if (loj.Credential) {
                        $.afui.loadContent("#submitOrder");
                    } else {
                        $.afui.loadContent("#notLoginBuy");
                    }
                });
            } else {
                hlp.myalert(r.message);
            }
        });
    });

    //商品分类
    $("#mallCategory").on("panelload",function(e){
        hlp.log("before get goodsCategory request...");
        svc.getGoodsCategory(function(r){
            if (r.status == "SUCCESS") {
                hlp.bindtpl(r.data,"#goodsCategory","tpl_goodsCategory");

                $("li[id^='cat']").off("tap").on("tap",function(){
                    var thisId = $(this).attr("id");
                    var catId = thisId.substring(3,thisId.length);
                    hlp.panelObj["catId"] = {"catId":catId};
                    var listBy = "1";
                    var orderFrom = "0";

                    hlp.log("before get goodsList request...");
                    //获取商品列表
                    svc.getGoodsList(catId,listBy,orderFrom,function(r){
                        if (r.status == "SUCCESS") {
                            hlp.bindtpl(r.data,"#goodsList","tpl_goodsList");
                            $(".gl").off("tap").on("tap", function () {
                                var goods_sn = $(this).attr("id");
                                var salesType = "0";
                                hlp.panelObj["commodityDetails"] = { "sn": goods_sn ,"sales_type":salesType};
                                $.afui.loadContent("#commodityDetails1");
                            });
                        } else {
                            hlp.myalert(r.message);
                        }
                    });

                    hlp.log("before getPersonHots request...");
                    //获取推荐商品
                    svc.getPersonHots(catId,function(r){
                        hlp.log("inside getPersonHots request...");
                        if(r.status == "SUCCESS"){
                            hlp.bindtpl(r.data,"#recommendGoods","tpl_recommendGoods");
                            hlp.bindtpl(r.data,"#recommendCommodity","tpl_recommendCommodity");
                            $(".mlr").off("tap").on("tap", function () {
                                var thisId = $(this).attr("id");
                                var goods_sn =  thisId.substring(3,thisId.length);
                                var salesType = "0";
                                hlp.panelObj["commodityDetails"] = { "sn": goods_sn ,"sales_type":salesType};
                                $.afui.loadContent("#commodityDetails1");
                            });
                        }else{
                            hlp.myalert(r.message);
                        }
                    });
                    $.afui.loadContent("#mallList");
                });

            } else {
                hlp.myalert(r.message);
            }
        });


    });

    //新品
    $("#newProduct").on("panelload",function(){
        hlp.log("before get new Product request...");
        //获取新品列表
        svc.getNewProduct(function(r){
            hlp.log("inside getNewProduct request...");
            if (r.status == "SUCCESS") {
                hlp.bindtpl(r.data,"#newProductInfo","tpl_newProductInfo");
                $("#newProductBannerList")[0].innerHTML = $(r.data.ad_img)[0].innerHTML;
                var salesType = $(".newProductPro").find(".salesType").val();
                $(".NewProductImg img").off("tap").on("tap", function () {
                    var id = $(this).attr("class");
                    hlp.panelObj["commodityDetails"] = { "sn": id ,"sales_type":salesType};
                    $.afui.loadContent("#commodityDetails1");
                });
                $("#newProduct_buyNow").off("tap").on("tap", function () {
                    var goodSn = $(this).attr("sn");
                    var sku_sn = $(this).attr("sku_sn");
                    hlp.panelObj["goods"] = {"good":[{ "sku_sn":sku_sn, "sn":goodSn, "num": 1 }],"isCart":"0"};
                    if (null != loj.Credential) {
                        $.afui.loadContent("#submitOrder ");
                    } else {
                        $.afui.loadContent("#notLoginBuy");
                    }
                });
            } else {
                hlp.myalert(r.message);
            }
        });

    });

    //秒杀
          $("#secKill").on("panelload",function(){
           hlp.log("before get secKill Product request...");
           //获取秒杀商品列表
           svc.getSecKill(function(r){
               hlp.log("inside getSecKill request...");
               if (r.status == "SUCCESS") {
                   // 1. 绑定数据 把秒杀的时间绑定进去
                   hlp.bindtpl(r.data,"#secKillProInfo","tpl_secKillProInfo");
                   setMsFlg();
                   $("#secKillBannerList")[0].innerHTML = $(r.data.ad_img)[0].innerHTML;
                   var salesType = $(".secKillPro").find(".salesType").val();
                   $(".SecKillImg img").off("tap").on("tap", function () {
                       var id = $(this).attr("class");
                       hlp.panelObj["commodityDetails"] = { "sn": id ,"sales_type":salesType};
                       $.afui.loadContent("#commodityDetails1");
                   });
                   $("#secKilling").off("tap").on("tap", function () {
                       var sn = $(this).attr("sn");
                       hlp.panelObj["commodityDetails"] = { "sn": sn ,"sales_type":salesType};
                       $.afui.loadContent("#commodityDetails1");
                   });

               } else {
                   hlp.myalert(r.message);
               }
           });

   });

    //商品详情
    $("#commodityDetails1").on("panelload",function(){
        $(".cartButton").show();

        var goToTopDisplayFg = false;
        $("#commodityDetails1").scroll(function () {
            if ($(this).scrollTop() > 100) {
                if (!goToTopDisplayFg) {
                    goToTopDisplayFg = true;
                    $("#back-to-top").css({ display: "_blank", opacity: "0" });
                    $("#back-to-top").fadeTo("fast", 1);
                }
            } else {
                if (goToTopDisplayFg) {
                    goToTopDisplayFg = false;
                    $("#back-to-top").css("display", "none");
                    $("#back-to-top").fadeTo("fast", 0);
                }
            }
        });

        //当点击跳转链接后，回到页面顶部位置

        $("#back-to-top").click(function(){
            $("#commodityDetails1").animate({ scrollTop: 0 }, 500);
            return false;
        });

        var goodsDetailSwiper = new  Swiper('#goodsDetail',{
            onSlideChangeEnd: function(swiper){
                var paraIsActive = $("#slideOne").is(".swiper-slide-active");
                var detailIsActive = $("#slideTwo").is(".swiper-slide-active");
                var commentIsActive = $("#slideThree").is(".swiper-slide-active");
                if(paraIsActive){
                    $("#headerParameter").addClass("cur");
                }else{
                    $("#headerParameter").removeClass("cur");
                }
                if(detailIsActive){
                    $("#headerDetail").addClass("cur");
                }else{
                    $("#headerDetail").removeClass("cur");
                }
                if(commentIsActive){
                    $("#headerComment").addClass("cur");
                }else{
                    $("#headerComment").removeClass("cur");
                }
            }
        });
        var myCommoditySwiper = new Swiper('#CommodityBanner',{
            pagination : '.swiper-pagination'
        });

        hlp.log("before getGoodsDetail request ...");
        var goods_sn = hlp.panelObj["commodityDetails"].sn;
        //获取商品详情
        var user_id = loj.UserId;
        svc.getGoodsDetail(goods_sn,user_id,function(r){
            if(r.status == "SUCCESS"){
                hlp.log("inside getGoodsDetail request...");
                hlp.bindtpl(r.data.galleries,"#CommodityBannerSwiper","tpl_CommodityBannerSwiper");
                hlp.bindtpl(r.data,"#prodetails_dataPro","tpl_prodetails_dataPro");
                hlp.panelObj["cat_id"] = { "cat_id": r.data.cat_id };
                $("#specificationParameter")[0].innerHTML = $(r.data.goods_desc).eq(2)[0].innerHTML;
                $("#goodsIntroduction")[0].innerHTML = $(r.data.goods_desc).eq(0)[0].innerHTML;
                $("#slideTwoDetail")[0].innerHTML = $(r.data.goods_desc).eq(0)[0].innerHTML;
                hlp.panelObj["purchaseQuantity"] = {"inventory": r.data.inventory};

                var collectFlag = r.data.collect_flag;
                var user_id = loj.UserId;
                if (collectFlag == "0") {
                    $("#favoriteFlag").parent().attr("class", "notfav");
                    $("#favoriteFlag").text("收藏");

                    $("#doFavorite").off("tap").on("tap",function(){
                        svc.addCollect(user_id,goods_sn,function(r){
                            if(r.status == "SUCCESS"){
                                hlp.myalert(r.message);
                                $("#favoriteFlag").parent().attr("class", "fav");
                                $("#favoriteFlag").text("已收藏");
                            }else{
                                hlp.myalert(r.message);
                            }
                        });
                    });
                }else{
                    $("#favoriteFlag").parent().attr("class", "fav");
                    $("#favoriteFlag").text("已收藏");

                    $("#doFavorite").off("tap").on("tap",function(){
                        svc.deleteCollect(user_id,goods_sn,function(r){
                            if(r.status == "SUCCESS"){
                                hlp.myalert(r.message);
                                $("#favoriteFlag").parent().attr("class", "notfav");
                                $("#favoriteFlag").text("收藏");
                            }else{
                                hlp.myalert(r.message);
                            }
                        });
                    });
                };

                var sku_sn = $(".sku_sn").val();
                //立即购买按钮事件
                $("#commodityDetails1_buyNow").off("tap").on("tap",function(){
                    var tokenId = loj.Credential;
                    var num = $("#purchaseQuantity").val();
                    hlp.panelObj["goods"] = {"good":[{ "sku_sn":sku_sn,"sn":goods_sn, "num": num }],"isCart":"0"};
                    if(tokenId){
                        $.afui.loadContent("#submitOrder");
                    }else{
                        $.afui.loadContent("#notLoginBuy");
                    }
                });

                //商品收藏

                $(".title_top").off("tap").on("tap",function(){
                    if($(".para_main").is(":hidden")){
                        $(".para_main").css("display","block");
                        $(".title_top").addClass("showcanshu");
                    }else{
                        $(".para_main").css("display","none");
                        $(".title_top").removeClass("showcanshu");
                    }
                });

                //判断是否是手机专享
                if(r.data.app_price == null){
                    $("#mobileExclusive").css("display","none");
                }else{
                    $("#mobileExclusive").css("display","block");
                }

                //判断sales_type
                var salesType = hlp.panelObj["commodityDetails"].sales_type;
                getSalesType(salesType);

                var catId = hlp.panelObj["cat_id"].cat_id;
                //商品详情页面获取推荐商品
                svc.getPersonHots(catId,function(r){
                    hlp.log("inside getPersonHots request...");
                    if(r.status == "SUCCESS"){
                        hlp.bindtpl(r.data,"#recommendCommodity","tpl_recommendCommodity");
                    }else{
                        hlp.myalert(r.message);
                    }
                });

            }else{
                hlp.myalert(r.message);
            }
        });


        //获取商品评论
        svc.getCommodityComment(goods_sn,function(r){
            hlp.log("inside getCommodityComment request...");
            if(r.status == "SUCCESS"){
                hlp.bindtpl(r.data,"#goodsComment","tpl_goodsComment");
                hlp.bindtpl(r.data, "#slideThreeComment", "tpl_goodsComment");
            }else{
                hlp.myalert(r.message);
            }
        });
        
        //加入购物车事件
        $('#addToMyCartBtn').off('tap').on('tap',function(){
            //此时调用加入商品到购物车的接口
            //单价及数量
            var sku_sn=$(".sku_sn").val();
            var quantity=parseFloat($('.prodetails input#purchaseQuantity').val());

            //调用接口
            svc.addToMyCart(loj.UserName,sku_sn,quantity,function(r){
                //R为返回结果
                if(r.status=='SUCCESS'){

                    alert('已添加到购物车');
                    //刷新右上角的购物车的图标数字
                    var quantityNewInCart=parseInt(loj.QuantityInCart);
                    quantityNewInCart=quantityNewInCart+1;
                    loj.QuantityInCart=quantityNewInCart;
                    $('#mainview .shortCar #quantityNewInCart').text(quantityNewInCart);
                    $('#mainview .shortCar #quantityNewInCart').css('display','block');

                }else{
                    alert('添加到购物车失败，请检查');
                }
            },function(message){
                hlp.log('调用接口-增加商品到购物车失败');
            }
            );
        });
    });
});

// 热卖商品
var getHotProduct = function(r) {
    $("#remai_product")[0].innerHTML = r;
};

// 特价产品
var getBargainPriceProduct = function (r) {
    $("#tejiaProduct")[0].innerHTML = r;
};

//明星产品
var getStarProduct = function(r){
    $("#starProduct")[0].innerHTML = r;
};

//新品上市
var getNewList = function(r){
    $("#newList")[0].innerHTML = r;
};

// 轮播图
var getIndexLoop = function(r) {
    $("#banner")[0].innerHTML = r;
};

//商品详情&&商品评价的点击事件
var showCommodityDetail = function(){
    if($("#goodsIntroduction").is(":hidden")){
        $("#goodsIntroduction").css("display","block");
        $("#showCommodityDetailDiv").addClass("showcanshu");
    }else{
        $("#goodsIntroduction").css("display","none");
        $("#showCommodityDetailDiv").removeClass("showcanshu");
    }
};
var showCommodityComment = function(){
    if($("#goodsComment").is(":hidden")){
        $("#goodsComment").css("display","block");
        $("#showCommodityCommentDiv").addClass("showcanshu");
    }else{
        $("#goodsComment").css("display","none");
        $("#showCommodityCommentDiv").removeClass("showcanshu");
    }
};

//增&&减购买数量
var minusCount = function(){
    var quantity = $("#purchaseQuantity").val();
    if(quantity>1){
        quantity--;
        $("#purchaseQuantity").val(quantity);
    }
};
var plusCount = function(){
    var quantity = $("#purchaseQuantity").val();
    var purchaseQuantity = hlp.panelObj["purchaseQuantity"].inventory;
    if(Number(quantity)<=Number(purchaseQuantity)){
        quantity++;
        $("#purchaseQuantity").val(quantity);
    }
};

//切换商品列表
var changeDisplay = function(){
    if($("#goodsListDiv").attr("class") == "list1"){
        $("#goodsListDiv").removeClass("list1");
        $("#goodsListDiv").addClass("list2");
    }else{
        $("#goodsListDiv").removeClass("list2");
        $("#goodsListDiv").addClass("list1");
    }
};

//商品列表筛选
var listBy = function(thisId){
    var listBy = thisId;
    var catId = hlp.panelObj["catId"].catId;
    var orderFrom = "0";

    switch (listBy){
        case "listBySales":
            listBy = "1";
            break;

        case "listByNew":
            listBy = "2";
            break;

        case "listByPrice":
            listBy = "3";
            break;

        case "listByPopular":
            listBy = "4";
            break;

        default :
            break;
    }

    //筛选后获取商品列表
    svc.getGoodsList(catId,listBy,orderFrom,function(r){
        if(r.status == "SUCCESS"){
            hlp.bindtpl(r.data,"#goodsList","tpl_goodsList");
            $(".gl").off("tap").on("tap", function () {
                var goods_sn = $(this).attr("id");
                var salesType = "0";
                hlp.panelObj["goods"] = { "sn": goods_sn ,"sales_type":salesType};
                $.afui.loadContent("#commodityDetails1");
            });
        }else{
            hlp.myalert(r.message);
        }
    });
};

//获取当前时间
var AppendZero = function(obj){
    if (obj < 10) return "0" + obj; else return obj;
};
var currentTime = function(){
    var d = new Date();

    var nowTime = d.getTime();
    var year = d.getFullYear(); //获取当前年份
    var month = d.getMonth()+1; //获取当前月份（0——11）
    var date = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var str = year + "-" + AppendZero (month) + "-" + AppendZero (date) + " " + AppendZero (hour) + ":" + AppendZero (minute) + ":" + AppendZero (second);
    return str;
};

// 把日期转化为数字
var convertDataTime = function(times) {
    var times = times.replace("-","").replace("-","").replace(" ","").replace(":","").replace(":","");
    return Number(times);
};

// 2. 循环
var setMsFlg = function () {
    var secKill = $("#secKillProInfo .secKillPro");
    var msFlg = 0;

    $.each(secKill, function(i) {

        var promoBeginTime = convertDataTime(secKill.eq(i).find(".promoBeginTime").val());
        var promoEndTime = convertDataTime(secKill.eq(i).find(".promoEndTime").val());
        var curTime = convertDataTime(currentTime());
        var testEndTime = secKill.eq(i).find(".promoEndTime").val().replace(/-/ig,'/');

        var testETime = new Date(testEndTime);

        if (curTime >= promoBeginTime && curTime < promoEndTime) {
            //秒杀正在进行中
            msFlg = 1;
        } else if (curTime < promoBeginTime) {
            //秒杀未开始
            msFlg = 2;
            setInterval(function(){
                var testCTime = new Date();
                var nMS = testETime.getTime() - testCTime.getTime();
                var myD=Math.floor(nMS/(1000 * 60 * 60 * 24)); //天
                var myH=Math.floor(nMS/(1000*60*60)) % 24; //小时
                var myM=Math.floor(nMS/(1000*60)) % 60; //分钟
                var myS=Math.floor(nMS/1000) % 60; //秒
                if(myD>= 0){
                    var str = myD+"天"+myH+"小时"+myM+"分"+myS+"秒";
                }else{
                    var str = "已结束！";
                }
                secKill.eq(i).find("#secKillNoBegin").html(str);
                $("#detailSecKill").html(str);
            },1000);
        } else if (curTime >= promoEndTime) {
            //秒杀结束
            msFlg = 3;
        }

        doMs(msFlg,secKill.eq(i));

    });

};

// 3 判断是否需要做秒杀动作
var doMs = function(flg,obj) {
    switch (flg) {
        case 1:
            // 秒杀正在进行中
            obj.find("#secKilling").show();
            obj.find("#secKillNoBegin").hide();
            obj.find("#secKillEnd").hide();
            break;
        case 2:
            // 秒杀未开始
            obj.find("#secKilling").hide();
            obj.find("#secKillNoBegin").show();
            obj.find("#secKillEnd").hide();
            break;
        case 3:
            // 秒杀结束
            obj.hide();
            /*obj.find("#secKilling").hide();
            obj.find("#secKillNoBegin").hide();
            obj.find("#secKillEnd").show();*/
            break;
        default:
            break;
    }
};

//判断salesType function
var getSalesType = function(salesType){
    switch (salesType){
        case "0":
            //新品&&普通商品
            $("#ofNormal").show();
            $("#ofGroup").hide();
            $("#ofSecKill").hide();
            if($("#btnProDiv").hasClass("btnSecGroupPro")){
                $("#btnProDiv").removeClass("btnSecGroupPro").addClass("btnPro");
            }
            break;
        case "1":
            //秒杀商品
            $("#ofNormal").hide();
            $("#ofGroup").hide();
            $("#ofSecKill").show();
            if($("#btnProDiv").hasClass("btnPro")){
                $("#btnProDiv").removeClass("btnPro").addClass("btnSecGroupPro");
            }
            break;
        case "3":
            //团购商品
            $("#ofNormal").hide();
            $("#ofGroup").show();
            $("#ofSecKill").hide();
            if($("#btnProDiv").hasClass("btnPro")){
                $("#btnProDiv").removeClass("btnPro").addClass("btnSecGroupPro");
            }
            break;
        default :
            break;
    }
};