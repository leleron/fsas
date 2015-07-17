$(function () {
    $.afui.launch();

    // 商城主页
    $("#mallIndex,#mallSearchResult,#mallCategory,#mallList,#newProduct,#secKill,#groupon,#seckillItem,#grouponItem,#commodityDetails1,#commodityDetails2,#commodityDetails3").on("backcomplete", function (e) {
        $(".cartButton").show();
    });


    // 商城主页
    $("#mallIndex").on("panelload", function (e) {
        //$(".backButton.back").css('display','none');
        $("footer").show();
        $(".categoryButton").show();
        $(".cartButton").show();
        $(".headSearchIcon").show();
        $("#headSearch").show();
        var mySwiper = new Swiper('#banner', {
            autoplay: 5000,
            //visibilityFullFit : true,
            loop: true
            //pagination : '.swiper-pagination'
        });
        //$("#search_box").width($(window).width()-180).css("display","block");
        
        //显示右上角的购物车的数字，如果数字为0，则不显示<span id="quantityNewInCart"></span>
        var quantityNewInCart=parseInt(loj.QuantityInCart);
        if(quantityNewInCart==0) {
        	$('#mainview .shortCar #quantityNewInCart').css("display","none");
        }
        else {
        	$('#mainview .shortCar #quantityNewInCart').val(quantityNewInCart);
        }
        
    });

    $("#mallIndex").on("panelunload", function (e) {
        //this.setBackButtonVisibility(true);
        //$(".backButton.back").css('display','block');
        $("footer").hide();
        $(".categoryButton").hide();
        $(".cartButton").hide();
        $(".headSearchIcon").hide();
        $("#headSearch").hide();
    });

    $("#mallSearchResult").on("panelload", function (e) {
        $(".cartButton").show();
        $(".headSearchIcon").show();
        $("#headSearch").show();
    });
    $("#mallSearchResult").on("panelunload", function (e) {
        $(".cartButton").hide();
        $(".headSearchIcon").hide();
        $("#headSearch").hide();
    });

    $("#mallCategory").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#mallCategory").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    $("#mallList").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#mallList").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    $("#newProduct").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#newProduct").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    $("#secKill").on("panelload", function (e) {

        $(".cartButton").show();
        console.log("secKill:panel load");
    });
    $("#secKill").on("panelunload", function (e) {
        $(".cartButton").hide();
        console.log("secKill:panel unload");
    });

    $("#groupon").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#groupon").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    $("#groupon").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#groupon").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    $("#pay").on("panelload", function (e) {
        //TODO 隐藏backbutton
    });
    $("#pay").on("panelunload", function (e) {
        //TODO 显示backbutton
    });

    $("#seckillItem").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#seckillItem").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    $("#grouponItem").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#grouponItem").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    //商品详情页面
    $("#commodityDetails1").on("panelload", function (e) {
        $(".cartButton").show();
        $(".prodetails .fav span").css('background', 'url("../images/greyStar.png")');

        var goodsDetailSwiper = new Swiper('#goodsDetail', {});

        var myCommoditySwiper = new Swiper('#CommodityBanner', {
            pagination: '.swiper-pagination'
        });
    });
    $("#commodityDetails1").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    $("#commodityDetails2").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#commodityDetails2").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    $("#commodityDetails3").on("panelload", function (e) {
        $(".cartButton").show();
    });
    $("#commodityDetails3").on("panelunload", function (e) {
        $(".cartButton").hide();
    });

    // news_top
    $("#UserCenter").on("panelload", function (e) {
        // $.afui.loadContent("#main");

        var uid = hlp.getparam(1);

        // tpl_mtlist
        svc.getuserprofile(uid, function (r) {

            hlp.binddata(r, "#mtlist", "tpl_mtlist");

        });
    });

    // 3.1.4.1.1 个人商城
    $("#myMall").on("panelload", function (e) {
        "use strict";

        // 刷新购物车图标
        RefreahShopCarIcon();
    });

    // 3.1.4.1.4.1 退款单
    $("#refundList").on("panelload", function (e) {
        "use strict";

        svc.getRefundList(loj.UserId, function (res) {
            if (res.data == null) {
                res.data = "";
            }

            //apply_time: "2015-03-24 15:12:38"
            //goods_thumb: "/sources/goods/FH6618/FH6618_big.jpg"
            //order_sn: "150228000097"
            //refund_money: "133"
            //returns_order_sn: "14271811589586"
            //returns_status: "1"
            //returns_statusString: "已提交"
            //total_money: "153.00"

            for (var i = 0; i < res.data.length; i++) {
                res.data[i]["returns_statusString"] = ReturnsStatusMapping[res.data[i].returns_status];
            }

            hlp.bindtpl(res.data, "#refundListDiv", "refundList_itemAdd");

            // 退款列表画面： 按下订单 处理
            $("#refundList a.tkListItem").bind("tap", function (e) {
                var returnsOrderSn = $(this).attr("returns_order_sn");

                var selectedOrderInfo = undefined;

                for (var i = 0; i < res.data.length; i++) {
                    if (returnsOrderSn == res.data[i].returns_order_sn) {
                        selectedOrderInfo = res.data[i];
                        break;
                    }
                }

                hlp.log("Navigate to good detial page. returns_order_sn:" + returnsOrderSn + " User id:" + loj.UserId + " orderInfo:" + selectedOrderInfo);

                hlp.panelObj["orderInfo"] = selectedOrderInfo;

                $.afui.loadContent("#refundDetail");
            });
        });
    });

    // 3.1.4.1.4.1 退款单详细 画面参数：hlp.panelObj["orderInfo"];
    $("#refundDetail").on("panelload", function (e) {
        "use strict";

        var orderInfo = hlp.panelObj["orderInfo"];

        svc.getRefundOrReturnDetail(orderInfo.returns_order_sn, function (res) {
            res.data.order_info["returns_statusString"] = ReturnsStatusMapping[res.data.order_info.returns_status];

            // 商品单价 * 商品数量 = 商品总价
            for (var i = 0; i < res.data.goods_info.length; i++) {
                res.data.goods_info[i]["goodsTotalPrice"] = parseInt(res.data.goods_info[i].goods_number) * parseInt(res.data.goods_info[i].goods_price);

                if (res.data.goods_info[i].lastupdate_time == null) {
                    res.data.goods_info[i].lastupdate_time = "";
                }
            }

            hlp.bindtpl(res.data.order_info, "#refundDetailorderDetailDiv", "refundDetail_orderDetailAdd");

            // 使用 退货单详细 画面的模板
            hlp.bindtpl(res.data.goods_info, "#refundDetailDiv", "returnDetail_itemAdd");

        $("#refundDetail li.tkListItem a.returnDetailItem").bind("tap", function (e) {
            var goodsSn = $(this).attr("goods_sn");

            hlp.log("Navigate to good detial page. goodsSn:" + goodsSn + " User id:" + loj.UserId);
        });
    });
    });

    $("#refundDetail").on("panelunload", function (e) {
        "use strict";

        delete hlp.panelObj["orderInfo"];
    });

    // 3.1.4.1.4.2 退货单
    $("#returnList").on("panelload", function (e) {
        "use strict";

        svc.getReturnList(loj.UserId, function (res) {
            if (res.data == null) {
                res.data = "";
            }

            //apply_time: "2015-03-24 18:44:13"
            //goods_thumb: "http://121.41.169.212:30002/sources/goods/FS372/FS372_000_01--w_80_h_80.jpg"
            //order_sn: "141205000157"
            //refund_goods: "a:1:{i:0;a:9:{s:7:"barcode";s:13:"6949123303725";s:10:"goods_name";s:9:"剃须刀";s:8:"ext_attr";s:0:"";s:11:"goods_price";s:5:"99.00";s:12:"goods_number";s:1:"2";s:9:"deal_code";s:12:"141205000157";s:9:"goods_img";s:37:"/sources/goods/FS372/FS372_000_01.jpg";s:8:"goods_sn";s:5:"FS372";s:6:"reason";s:3:"dAD";}}"
            //returns_order_sn: "14271938539292"
            //returns_status: "2"
            //total_money: 99

            for (var i = 0; i < res.data.length; i++) {
                res.data[i]["returns_statusString"] = ReturnsStatusMapping[res.data[i].returns_status];
            }

            hlp.bindtpl(res.data, "#returnListDiv", "returnList_itemAdd");

            // 退货列表画面： 按下订单 处理
            $("#returnList a.tkListItem").bind("tap", function (e) {
                var returnsOrderSn = $(this).attr("returns_order_sn");

                var selectedOrderInfo = undefined;

                for (var i = 0; i < res.data.length; i++) {
                    if (returnsOrderSn == res.data[i].returns_order_sn) {
                        selectedOrderInfo = res.data[i];
                    }
                }

                hlp.log("Navigate to good detial page. returns_order_sn:" + returnsOrderSn + " User id:" + loj.UserId + " orderInfo:" + selectedOrderInfo);

                hlp.panelObj["orderInfo"] = selectedOrderInfo;

                $.afui.loadContent("#returnDetail");
            });
        });
    });

    // 3.1.4.1.4.2.1 退货单详细 画面参数：hlp.panelObj["orderInfo"];
    $("#returnDetail").on("panelload", function (e) {
        "use strict";

        // order_info
        //lastupdate_time: null
        //pay_name: "支付宝"
        //returns_order_sn: "14271928878121"
        //returns_status: "0"
        //shipping_fee: "0.00"
        //total_goods_price: "198.00"
        //total_trans_price: "198.00"

        // goods_info
        //goods_name: "剃须刀"
        //goods_number: "2"
        //goods_price: "99.00"
        //goods_thumb: "http://121.41.169.212:30002/sources/goods/FS372/FS372_big--w_80_h_80.jpg"
        
        var orderInfo = hlp.panelObj["orderInfo"];

        svc.getRefundOrReturnDetail(orderInfo.returns_order_sn, function (res) {
            res.data.order_info["returns_statusString"] = ReturnsStatusMapping[res.data.order_info.returns_status];

            // 商品单价 * 商品数量 = 商品总价
            for (var i = 0; i < res.data.goods_info.length; i++) {
                res.data.goods_info[i]["goodsTotalPrice"] = parseInt(res.data.goods_info[i].goods_number) * parseInt(res.data.goods_info[i].goods_price);
            }

            hlp.bindtpl(res.data.order_info, "#returnDetailorderDetailDiv", "returnDetail_orderDetailAdd");

            hlp.bindtpl(res.data.goods_info, "#returnDetailDiv", "returnDetail_itemAdd");

        $("#returnDetail li.tkListItem a.returnDetailItem").bind("tap", function (e) {
            var goodsSn = $(this).attr("goods_sn");

            hlp.log("Navigate to good detial page. goodsSn:" + goodsSn + " User id:" + loj.UserId);
        });
    });

        
    });

    $("#returnDetail").on("panelunload", function (e) {
        "use strict";

        delete hlp.panelObj["orderInfo"];
    });

    // 3.1.4.1.5.1 收货地址管理
    $("#addressManage").on("panelload", function (e) {
        "use strict";

        svc.getAddressList(loj.UserId, function(res) {
            if (res.data == null) {
                res.data = "";
            }

            svc.setDefaultAddress("", loj.UserId, function(res1) {
                if (res1.data != null) {
                    // 设置默认地址
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].address_id == res1.data.address_id) {
                            res.data[i]["default_address_prop"] = "cur";
                            break;
                        }
                    }
                }

                hlp.bindtpl(res.data, "#addressManageDiv", "addressManage_itemAdd");

                $("#addressManageDiv li.tkListItem a").bind("tap", function(e) {
                    var addressId = $(this).attr("address_id");

                    var selectedAddressInfo = undefined;

                    for (var i = 0; i < res.data.length; i++) {
                        if (addressId == res.data[i].address_id) {
                            selectedAddressInfo = res.data[i];
                        }
                    }

                    hlp.panelObj["addressInfo"] = selectedAddressInfo;

                    hlp.log("Navigate to Addredd edit page. address_id:" + addressId + " User id:" + loj.UserId + " addressInfo:" + selectedAddressInfo);

                    $.afui.loadContent("#addressEdit");
                });

                $("#addressManageDiv li.addBtn a").one("tap", function(e) {
                    hlp.log("Navigate to Addredd add page. User id:" + loj.UserId);
                    $.afui.loadContent("#addressAdd");
                });

            });
        });
    });

    // 3.1.4.1.5.2 新增收货地址
    $("#addressAdd").on("panelload", function (e) {
        "use strict";

        // 地址Selection初始化
        InitAddressSelects(
            "#addressAdd form#addAddressForm div.addressBg select#addAddress_province", "addAddress_province",
            "#addressAdd form#addAddressForm div.addressBg select#addAddress_city", "addAddress_city",
            "#addressAdd form#addAddressForm div.addressBg select#addAddress_district", "addAddress_district",
            "address_itemAdd");

        svc.getPromo(function (res) {
            if (res.status == "SUCCESS") {
                $("#addressAdd div#addAddressMessage").text(res.data.desc);
            } else {
                hlp.log("Call svc.getPromo failed. message:" + res.message);
            }
        });

        // 重置表单
        $("#addressAdd #addAddressForm input").each(function () {
            $(this).val("");
        });
        $("#addressAdd #addAddressForm select").each(function () {
            if ($(this) && $(this)[0]) {
                $(this)[0].selectedIndex = 0;
            }
        });

        var mobile=hlp.panelObj["notLoginBuyMobile"];
        if(mobile){
            $("#addressAdd_mobile").val(mobile.mobile);
        };

        var form = $("#addressAdd #addAddressForm");
        var options = addressFromVaildOptions;
        options["errorPlacement"] = function (error, element) {
            if (form.attr("check_status") == "false") {
                form.attr("check_status", "true");
                if (error[0]) {
                    hlp.myalert(error[0].innerHTML);
                }
            }
        };

        form.validate(options).resetForm();
    });

    $("#addressAdd").on("panelunload", function (e) {
        "use strict";

        delete hlp.panelObj["notLoginBuyMobile"];
    });

    // 3.1.4.1.5.3 收货地址修改
    $("#addressEdit").on("panelload", function (e) {
        "use strict";

        // 初始化表单
        var addressInfo = hlp.panelObj["addressInfo"];

        if (addressInfo.default_address_prop == "cur") {
            $("#addressEdit form#editAddressForm div#SetAsDefaultAddressDiv").css("display", "none");
        } else {
            $("#addressEdit form#editAddressForm div#SetAsDefaultAddressDiv").css("display", "");
        }

        // 地址Selection初始化
        InitAddressSelects(
            "#addressEdit form#editAddressForm div.addressBg select#editAddress_province", "e                                                                                                     ditAddress_province",
            "#addressEdit form#editAddressForm div.addressBg select#editAddress_city", "editAddress_city",
            "#addressEdit form#editAddressForm div.addressBg select#editAddress_district", "editAddress_district",
            "addressEdit_itemAdd", addressInfo);

        svc.getAddressListByAddressId(loj.UserId, addressInfo.address_id, function (res) {

            $("#addressEdit #editAddressForm input[name=address_consignee]").val(res.data.consignee);
            $("#addressEdit #editAddressForm input[name=address_address]").val(res.data.address);
            $("#addressEdit #editAddressForm input[name=address_zipcode]").val(res.data.zipcode);
            $("#addressEdit #editAddressForm input[name=address_tel]").val(res.data.tel);
            $("#addressEdit #editAddressForm input[name=address_mobile]").val(res.data.mobile);
            $("#addressEdit #editAddressForm input[name=address_id]").val(res.data.address_id);

            var form = $("#addressEdit #editAddressForm");

            var options = addressFromVaildOptions;
            options["errorPlacement"] = function (error, element) {
                if (form.attr("check_status") == "false") {
                    form.attr("check_status", "true");
                    if (error[0]) {
                        hlp.myalert(error[0].innerHTML);
                    }
                }
            };

            form.validate(options).resetForm();

        });

        // 收货地址 删除 对话框 确定按钮
        $("#addressEdit div.layOutDel a.btnOk").off("tap").on("tap", function (e) {
            hlp.log("myFavorite del item submit. addressId:" + addressInfo.address_id + " User id:" + loj.UserId);

            $("#addressEdit div.layOutDel").fadeTo("fast", 0, function () {
                $("#addressEdit div.layOutDel").css("display", "none");
            });

            svc.delAddress(addressInfo.address_id, loj.UserId, function (res) {
                hlp.log("myFavorite del item submitted. status:" + res.status + " message:" + res.message);

                $.afui.goBack();
            });
        });

        // 收货地址 删除 对话框 取消按钮
        $("#addressEdit div.layOutDel a.btnNo").off("tap").on("tap", function(e) {
            $("#addressEdit div.layOutDel").fadeTo("fast", 0, function() {
                $("#addressEdit div.layOutDel").css("display", "none");
            });
        });
    });

    $("#addressEdit").on("panelunload", function (e) {
        "use strict";

        delete hlp.panelObj["addressInfo"];
    });

    // 3.1.4.1.6 我的收藏
    $("#myFavorite").on("panelload", function (e) {
        "use strict";

        hlp.log("#myFavorite panelload.");
        
        // 我的收藏 列表刷新
        var refreshMyFavoriteFunc = function () {
            hlp.log("RefreshMyFavorite svc.getMyFavouriteList.");

            svc.getMyFavouriteList(loj.UserId, 1, function (res) {
                if (res.data == null) {
                    res.data = "";
                }

                hlp.bindtpl(res.data, "#myFavouriteDiv", "myFavouriteList_itemAdd");

                $("#myFavorite div.tkListItem a.del").bind("tap", function (e) {
                    $("#myFavorite div.layOutDel").css({ display: "_blank", opacity: "0" });
                    $("#myFavorite div.layOutDel").fadeTo("fast", 1);

                    var goodsSn = $(this).attr("goods_sn");
                    $(".myGoodsSn").val(goodsSn);
                });

                $("#myFavorite div.tkListItem img, #myFavorite div.tkListItem strong, #myFavorite div.tkListItem span").bind("tap", function (e) {
                    var goodsSn = $(this).attr("goods_sn");

                    var selectedGoodInfo = undefined;

                    for (var i = 0; i < res.data.length; i++) {
                        if (goodsSn == res.data[i].goods_sn) {
                            selectedGoodInfo = res.data[i];
                            selectedGoodInfo["sn"] = goodsSn;
                        }
                    }

                    hlp.log("Navigate to good detial page. goodsSn:" + goodsSn + " User id:" + loj.UserId);

                    hlp.panelObj["goods"] = selectedGoodInfo;

                    $.afui.loadContent("#commodityDetails1");
                });
            });
        };

        refreshMyFavoriteFunc();

        // 我的收藏 删除 对话框 确定按钮
        $("#myFavorite div.layOutDel a.btnOk").off("tap").on("tap", function (e) {
            var goodsSn = $(".myGoodsSn").val();

            hlp.log("myFavorite del item submit. goodsSn:" + goodsSn + " User id:" + loj.UserId);

            $(".layOutDel").fadeTo("fast", 0, function () {
                $(".layOutDel").css("display", "none");
            });

            svc.delFavourite(loj.UserId, goodsSn, function (res) {
                refreshMyFavoriteFunc();
            });
        });

        // 我的收藏 删除 对话框 取消按钮
        $("#myFavorite div.layOutDel a.btnNo").off("tap").on("tap", function (e) {
            $("#myFavorite div.layOutDel").fadeTo("fast", 0, function () {
                $("#myFavorite div.layOutDel").css("display", "none");
        });
    });
    });

    // 3.1.4.1.7.1 已评价商品
    $("#evaluatedList").on("panelload", function (e) {
        "use strict";

        hlp.log("#evaluatedList panelload.");

        svc.getGoodsComment(loj.UserId, 1, function (res) {
            if (res.data == null) {
                res.data = "";
            }

            //add_time: "2015-07-13 14:10:06"
            //allow_amend: "1"
            //answer: null
            //append_comment: Object
            //comment_id: "12937"
            //comment_img: false
            //comment_rank: "1"
            //content: "卷毛！"
            //goods_name: "飞科FR5211毛球修剪器"
            //goods_sn: "FR5211"
            //goods_thumb: "/sources/goods/FR5211//FR5211_big.jpg"
            //order_sn: "141011111096"
            //status: "0"

            //add_time: "2015-07-13 16:09:00"
            //allow_amend: "1"
            //answer: null
            //comment_id: "12938"
            //comment_img: ""
            //comment_rank: "1"
            //content: "还是卷毛！！！"
            //status: "0"

            for (var i = 0; i < res.data.length; i++) {
                var rank = parseInt(res.data[i].comment_rank);

                if (rank == 0 || rank == NaN) {
                    res.data[i]["rankStarStyle"] = "display: none;";
                } else {
                    res.data[i]["rankStarStyle"] = "width: " + ((rank - 1) * 20).toString() + "%;";
                }

                if (res.data[i].answer == null) {
                    res.data[i].answer = "";
                }
            }

            hlp.bindtpl(res.data, "#evaluationSubmitEvaluatedListDiv", "evaluatedList_itemAdd");

            $("#evaluationSubmitEvaluatedListDiv li.tkListItem").bind("tap", function (e) {
                var orderSn = $(this).attr("order_sn");

                var goodSn = $(this).attr("goods_sn");

                var goodInfo = undefined;

                for (var i = 0; i < res.data.length; i++) {
                    if (goodSn == res.data[i].goods_sn) {
                        goodInfo = res.data[i];
                    }
                }

                if (goodInfo && goodInfo.append_comment && goodInfo.append_comment.length == 0) {
                    hlp.panelObj["goodInfo"] = goodInfo;
                    hlp.log("Navigate to evaluation append page. order_sn:" + orderSn + " goods_sn:" + goodSn + " User id:" + loj.UserId + " goodInfo:" + goodInfo);

                    $.afui.loadContent("#evaluateMore");
                } else {
                    hlp.myalert("请不要多次追加评论");
                }
            });
        });
    });

    // 3.1.4.1.7.2 未评价商品
    $("#evaluateReadyList").on("panelload", function (e) {
        "use strict";

        hlp.log("#evaluateReadyList panelload.");

        svc.getGoodsNocomment(loj.UserId, 1, function (res) {
            if (res.data == null) {
                res.data = "";
            }

            //add_time: "2014-10-11 15:28:34"
            //goods_name: "飞科FR5211毛球修剪器"
            //goods_sn: "FR5211"
            //goods_thumb: "/sources/goods/FR5211//FR5211_big.jpg"
            //order_sn: "141011111096"
            //shop_price: "49.00"

            hlp.bindtpl(res.data, "#evaluateReadyListDiv", "evaluateReadyList_itemAdd");

            $("#evaluateReadyListDiv li.tkListItem").bind("tap", function (e) {
                var orderSn = $(this).attr("order_sn");

                var goodSn = $(this).attr("goods_sn");

                var goodInfo = undefined;

                for (var i = 0; i < res.data.length; i++) {
                    if (goodSn == res.data[i].goods_sn) {
                        goodInfo = res.data[i];
                    }
                }

                hlp.panelObj["goodInfo"] = goodInfo;

                hlp.log("Navigate to evaluation add page. order_sn:" + orderSn + " goods_sn:" + goodSn + " User id:" + loj.UserId + " goodInfo:" + goodInfo);

                $.afui.loadContent("#evaluationSubmit");
            });

        });
    });

    // 3.1.4.1.8 我的签到
    $("#checkin").on("panelload", function(e) {
        "use strict";

        hlp.log("#checkin panelload.");

        svc.getCheckInInfo(loj.UserId, function(res) {

            //sign_flag: 0
            //sign_total_integral: null

            $("#checkin div#checkInButtonDiv").empty();

            if (res.data.sign_flag == "0") {
                $("#checkin div#checkInButtonDiv").append('<a onclick="DoCheckIn()" class="blueBtn">签到</a>');
            } else {
                $("#checkin div#checkInButtonDiv").append('<a class="blueBtn grey">今天已签到，请明天再来吧！</a>');
            }

            if (res.data.sign_total_integral == null) {
                res.data.sign_total_integral = "0";
            }

            $("#checkin div.signCon span#checkInHeaderSpan1").text(res.data.sign_total_integral);
        });

        // TODO 总积分获取方法？
        //svc.getMyPointsList(loj.UserId, 1, getNowDate().year, currentMonth, function (res1) {
        //    // datetime: "2015-07-07 09:43:17"
        //    // id: "1850"
        //    // integral: "900"
        //    // integral_desc: "注册送积分"
        //    // integral_type: "1"
        //    // invite_user_id: ""
        //    // order_integral_status: "0"
        //    // order_sn: ""
        //    // remark: "+900"
        //    // status: "0"
        //    // type: "1"
        //    // user_id: "15696126517"

        //    $("#checkin div.signCon span#checkInHeaderSpan2").text(res1.data[0].integral);
        //});

        //获取用户信息
        svc.getuserinfo(loj.Credential, function (res) {
            //result: Object
            //APP_VERSION: ""
            //BINDED_FLYCO_ACCOUNT: ""
            //DAY: 0
            //HEIGHT: 0
            //HOME_ADDRESS: ""
            //IMAGE: ""
            //LAST_LOGIN_IP: ""
            //LAST_PHONE_BRAND: ""
            //LAST_PHONE_SYSTEM: ""
            //LEVEL: ""
            //LOGIN_TYPE: ""
            //MOBILE: "15696126517"
            //MONTH: 0
            //OTHER_1: ""
            //OTHER_2: ""
            //OTHER_3: ""
            //OTHER_4: ""
            //OTHER_5: ""
            //PASSWORD: "123456"
            //REAL_NAME: ""
            //REGION: ""
            //SEX: ""
            //SOURCE_SYSTEM: ""
            //USER_INTEGRAL: 0
            //USER_NAME: "15696126517"
            //USER_TYPE: ""
            //YEAR: 0
            $("#checkin div.signCon span#checkInHeaderSpan2").text(res.result.USER_INTEGRAL);
        });
    });

    $("#checkinSuccess").on("panelload", function(e) {
        "use strict";

        // 3秒后自动返回
        setTimeout(function() { $.afui.goBack(); }, 3000);

        $("#checkinSuccess img#checkInSuccessImg").off("tap").on("tap", function(e) {
            $.afui.goBack();
        });
    });

    // 3.1.4.1.9 我的积分
    $("#myPoints").on("panelload", function(e) {
        "use strict";

        hlp.log("#myPoints panelload.");

        var currentYear = getNowDate().year;
        var currentMonth = getNowDate().month;
        
        var tempYear = [];
        for (var i = 0; i <= 41; i++) {
            tempYear[i] = {};
            tempYear[i]["value"] = currentYear - 20 + i;
            tempYear[i]["label"] = currentYear - 20 + i + " 年";
        }
        hlp.bindtpl(tempYear, "#myPointsSearchYear", "myPointsDate_itemAdd");
        $("#myPoints select#myPointsSearchYear").val(currentYear);

        var tempMonth = [];
        for (var j = 0; j < 12; j++) {
            tempMonth[j] = {};

            if ((1 + j) < 10) {
                tempMonth[j]["value"] = "0" + (1 + j).toString();
                tempMonth[j]["label"] = "0" + (1 + j).toString() + " 月";
            } else {
                tempMonth[j]["value"] = (1 + j).toString();
                tempMonth[j]["label"] = (1 + j).toString() + " 月";
            }
        }
        hlp.bindtpl(tempMonth, "#myPointsSearchMonth", "myPointsDate_itemAdd");
        if (currentMonth < 10) {
            $("#myPoints select#myPointsSearchMonth").val("0" + currentMonth);
        } else {
            $("#myPoints select#myPointsSearchMonth").val(currentMonth);
        }

        // 我的积分 查询
        $("#myPoints a#myPointsSearchBtn").off("tap").on("tap", function(e) {
            var selectedYear = $("#myPoints select#myPointsSearchYear").val();
            var selectedMonth = $("#myPoints select#myPointsSearchMonth").val();

            svc.getMyPointsList(loj.UserId, 1, selectedYear, selectedMonth, function(res) {
                if (res.data == null) {
                    res.data = "";
                }

                // datetime: "2015-07-07 09:43:17"
                // id: "1850"
                // integral: "900"
                // integral_desc: "注册送积分"
                // integral_type: "1"
                // invite_user_id: ""
                // order_integral_status: "0"
                // order_sn: ""
                // remark: "+900"
                // status: "0"
                // type: "1"
                // user_id: "15696126517"

                for (var i = 0; i < res.data.length; i++) {
                    if (parseInt(res.data[i].integral) > 0) {
                        res.data[i]["remarkClass"] = "blue";
                    } else {
                        res.data[i]["remarkClass"] = "red";
                    }
                }

                hlp.bindtpl(res.data, "#myPointsListDiv", "myPoints_itemAdd");
            });
        });

        //获取用户信息
        svc.getuserinfo(loj.Credential, function (res) {
            $("#myPoints div.signCon span#myPointsHeaderSpan").text(res.result.USER_INTEGRAL);
        });
       
    });

    // 追加评价
    $("#evaluateMore").on("panelload", function (e) {
        "use strict";

        var goodInfo = hlp.panelObj["goodInfo"];
        
        $("#evaluateMoreDiv input#evaluateMoreOrderSn").val(goodInfo.order_sn);
        $("#evaluateMoreDiv input#evaluateMoreGoodSn").val(goodInfo.goods_sn);
        $("#evaluateMoreDiv input#evaluateMoreCommentId").val(goodInfo.comment_id);
        
        $("#evaluateMoreDiv div#evaluateMore_comment_rank div").each(function() {
            $(this).attr("class", "starGrey");
        });
        $("#evaluateMoreDiv textarea#evaluateMore_textarea").val("");

        // 设置商品图片
        $("#evaluateMoreDiv img#evaluateMoreGoodsThumb").attr("src", goodInfo.goods_thumb);
        
        // 初始化星级评价控件
        $("#evaluateMoreDiv div#evaluateMore_comment_rank div#evaluateMoreRankStar1").off("tap").on("tap", function (e) {
            if ($(this).attr("class") == "star") {
                if ($("#evaluateMoreDiv div#evaluateMore_comment_rank div#evaluateMoreRankStar2").attr("class") == "star") {
                    for (var j = 2; j <= 5; j++) {
                        $("#evaluateMoreDiv div#evaluateMore_comment_rank div#evaluateMoreRankStar" + j).attr("class", "starGrey");
                    }
                } else {
                    for (var j = 1; j <= 5; j++) {
                        $("#evaluateMoreDiv div#evaluateMore_comment_rank div#evaluateMoreRankStar" + j).attr("class", "starGrey");
                    }
                }
            } else {
                $("#evaluateMoreDiv div#evaluateMore_comment_rank div#evaluateMoreRankStar1").attr("class", "star");
            }
        });
        for (var i = 2; i <= 5; i++) {
            $("#evaluateMoreDiv div#evaluateMore_comment_rank div#evaluateMoreRankStar" + i).off("tap").on("tap", function (e) {
                var currentStarId = $(this).attr("id");

                hlp.log("div#evaluateMoreRankStar tap event handled id:" + currentStarId);

                for (var j = 1; j <= 5; j++) {
                    if (("evaluateMoreRankStar" + j) <= currentStarId) {
                        $("#evaluateMoreDiv div#evaluateMore_comment_rank div#evaluateMoreRankStar" + j).attr("class", "star");
                    } else {
                        $("#evaluateMoreDiv div#evaluateMore_comment_rank div#evaluateMoreRankStar" + j).attr("class", "starGrey");
                    }
                }
            });
        }

        // 设置评价内容控件
        $("#evaluateMoreDiv textarea#evaluateMore_textarea").off("keyup").on("keyup", function (e) {
            hlp.log("#evaluateMoreDiv textarea#evaluateMore_textarea keyup event handled");

            var textContent = $(this).val();

            $("#evaluateMoreDiv span#evaluateMore_textCount").html((140 - textContent.length).toString() + "字");
        });

        $("#evaluateMoreDiv div#evaluateMore_photo").off("tap").on("tap", function (e) {
            hlp.log("#evaluateMoreDiv div#evaluateMore_photo tap event handled");

            getPictureFromCamera(function (imgdata) {
                hlp.log("Call plugIn getPictureFromCamera success:" + imgdata);

                $("#evaluateMoreDiv div.evaluateMore_photo").append("<img src='" + "data:image/jpg;image/png;base64," + imgdata + "'/>");

            }, function (error) {
                hlp.log("Call plugIn getPictureFromCamera error:" + error);
                hlp.myalert(error);
            });
        });

    });

    $("#evaluateMore").on("panelunload", function (e) {
        "use strict";

        delete hlp.panelObj["goodInfo"];
    });

    // 发表评价
    $("#evaluationSubmit").on("panelload", function (e) {
        "use strict";

        var goodInfo = hlp.panelObj["goodInfo"];

        $("#evaluationSubmitDiv input#evaluationSubmitOrderSn").val(goodInfo.order_sn);
        $("#evaluationSubmitDiv input#evaluationSubmitGoodSn").val(goodInfo.goods_sn);

        $("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div").each(function() {
            $(this).attr("class", "starGrey");
        });
        $("#evaluationSubmitDiv textarea#evaluationSubmit_textCount").val("");

        // 设置商品图片
        $("#evaluationSubmitDiv img#evaluationSubmitGoodsThumb").attr("src", goodInfo.goods_thumb);

        // 初始化星级评价控件
        $("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div#evaluationSubmitRankStar1").off("tap").on("tap", function (e) {
            if ($(this).attr("class") == "star") {
                if ($("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div#evaluationSubmitRankStar2").attr("class") == "star") {
                    for (var j = 2; j <= 5; j++) {
                        $("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div#evaluationSubmitRankStar" + j).attr("class", "starGrey");
                    }
                } else {
                    for (var j = 1; j <= 5; j++) {
                        $("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div#evaluationSubmitRankStar" + j).attr("class", "starGrey");
                    }
                }
            } else {
                $("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div#evaluationSubmitRankStar1").attr("class", "star");
            }
        });
        for (var i = 2; i <= 5; i++) {
            $("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div#evaluationSubmitRankStar" + i).off("tap").on("tap", function (e) {
                var currentStarId = $(this).attr("id");

                hlp.log("div#evaluationSubmitRankStar tap event handled id:" + currentStarId);

                for (var j = 1; j <= 5; j++) {
                    if (("evaluationSubmitRankStar" + j) <= currentStarId) {
                        $("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div#evaluationSubmitRankStar" + j).attr("class", "star");
                    } else {
                        $("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div#evaluationSubmitRankStar" + j).attr("class", "starGrey");
                    }
                }
            });
        }

        // 设置评价内容控件
        $("#evaluationSubmitDiv textarea#evaluationSubmit_textarea").off("keyup").on("keyup", function (e) {
            hlp.log("#evaluationSubmitDiv textarea#evaluationSubmit_textarea keyup event handled");

            var textContent = $(this).val();

            $("#evaluationSubmitDiv span#evaluationSubmit_textCount").html((140 - textContent.length).toString() + "字");
        });

        $("#evaluationSubmitDiv div#evaluationSubmit_photo").off("tap").on("tap", function (e) {
            hlp.log("#evaluationSubmitDiv div#evaluationSubmit_photo tap event handled");

            getPictureFromCamera(function (imgdata) {
                hlp.log("Call plugIn getPictureFromCamera success:" + imgdata);

                $("#evaluateMoreDiv div.evaluateMore_photo").append("<img src='" + "data:image/jpg;image/png;base64," + imgdata + "'/>");
            }, function (error) {
                hlp.log("Call plugIn getPictureFromCamera error:" + error);
                hlp.myalert(error);
            });
        });
    });

    $("#evaluationSubmit").on("panelunload", function (e) {
        "use strict";

        delete hlp.panelObj["goodInfo"];
    });

});

jQuery.validator.addMethod("checkAddressSelectionRequire",
    function (value, element, param) {
        if (param) {
            return value != "-1";
        }

        return true;
    }, "请选择省市");

jQuery.validator.addMethod("regularExpressCheck",
    function (value, element, param) {
        if (value == "") {
            return false;
        } else {
            if (!param.test(value)) {
                return false;
            }
        }
        return true;
    }, "输入的数据不合法");

jQuery.validator.addMethod("regularExpressCheckNullable",
    function (value, element, param) {
        if (value == "") {
            return true;
        } else {
            if (!param.test(value)) {
                return false;
            }
        }
        return true;
    }, "输入的数据不合法");

// TODO 我的收藏 添加到收藏
function AddToFavourite(e) {
    "use strict";

    var goodsSn = $(".myGoodsSn").val();

    hlp.log("goodsSn:" + goodsSn + " User id:" + loj.UserId);

    // $.afui.loadContent("#myFavorite");
};

// 画面右上角 购物车图表初始化用 返回购物车内商品数量
function GetItemCountInShopCar(callback) {
    "use strict";

    svc.getCartList(loj.UserId, function(res) {
        //var shopCarData = {
        //    "status": "SUCCESS",
        //    "message": "查询成功",
        //    "data": [
        //        { "rec_id": "26240", "goods_sn": "FS360", "goods_name": "\u98de\u79d1FS359\u5243\u987b\u52000", "market_price": "298.01", "goods_price": "149.01", "goods_thumb": "\/sources\/goods\/FS359\/FS359_big.jpg", "goods_img": "\/sources\/goods\/FS359\/FS359_big.jpg" },
        //        { "rec_id": "26241", "goods_sn": "FS361", "goods_name": "\u98de\u79d1FS359\u5243\u987b\u52001", "market_price": "298.02", "goods_price": "149.02", "goods_thumb": "\/sources\/goods\/FS359\/FS359_big.jpg", "goods_img": "\/sources\/goods\/FS359\/FS359_big.jpg" },
        //        { "rec_id": "26242", "goods_sn": "FS362", "goods_name": "\u98de\u79d1FS359\u5243\u987b\u52002", "market_price": "298.03", "goods_price": "149.03", "goods_thumb": "\/sources\/goods\/FS359\/FS359_big.jpg", "goods_img": "\/sources\/goods\/FS359\/FS359_big.jpg" },
        //    ]
        //};

    if (callback) {
            callback(res.data.length);
    }

        return res.data.length;
    });
};

// 刷新购物车图标的商品数量
function RefreahShopCarIcon() {
    "use strict";

    GetItemCountInShopCar(function (count) {
        $("header a.cartButton div.shortCar span").each(function () {
            $(this).text(count);
        });
    });
};

// 添加新的收货地址
function AddAddress() {
    "use strict";

    hlp.log("AddAddress() Called. UserName:" + loj.UserId);

    var form = $("#addressAdd #addAddressForm");

    form.attr("check_status", "false");

    if (form.valid()) {
        hlp.log("AddAddress() Submit. UserName:" + loj.UserId);

        var data = {
            "user_id": loj.UserId,
            "consignee": $("#addressAdd #addAddressForm input[name=address_consignee]").val(),
            "province": $("#addressAdd #addAddressForm select[name=address_province]").val(),
            "city": $("#addressAdd #addAddressForm select[name=address_city]").val(),
            "district": $("#addressAdd #addAddressForm select[name=address_district]").val(),
            "address": $("#addressAdd #addAddressForm input[name=address_address]").val(),
            "email": "",
            "zipcode": $("#addressAdd #addAddressForm input[name=address_zipcode]").val(),
            "tel": $("#addressAdd #addAddressForm input[name=address_tel]").val(),
            "mobile": $("#addressAdd #addAddressForm input[name=address_mobile]").val()
        };

        hlp.log("AddAddress() data:" + data);

        svc.addAddress(data, function (res) {
            if (res.status == "SUCCESS") {
                hlp.myalert(res.message);

                $.afui.goBack();
            } else {
                hlp.log("svc.addAddress failed. message:" + res.message);

                hlp.myalert("添加地址失败");
            }
        });
    }
};

// 编辑收货地址 提交
function EditAddress() {
    "use strict";

    hlp.log("EditAddress() Called. UserName:" + loj.UserId);

    var form = $("#addressEdit #editAddressForm");

    form.attr("check_status", "false");

    if (form.valid()) {
        hlp.log("EditAddress() Submit. UserName:" + loj.UserId);

        var data = {
            "user_id": loj.UserId,
            "address_id": $("#addressEdit #editAddressForm input[name=address_id]").val(),
            "consignee": $("#addressEdit #editAddressForm input[name=address_consignee]").val(),
            "province": $("#addressEdit #editAddressForm select[name=address_province]").val(),
            "city": $("#addressEdit #editAddressForm select[name=address_city]").val(),
            "district": $("#addressEdit #editAddressForm select[name=address_district]").val(),
            "address": $("#addressEdit #editAddressForm input[name=address_address]").val(),
            "email": "",
            "zipcode": $("#addressEdit #editAddressForm input[name=address_zipcode]").val(),
            "tel": $("#addressEdit #editAddressForm input[name=address_tel]").val(),
            "mobile": $("#addressEdit #editAddressForm input[name=address_mobile]").val()
        };

        svc.editAddressList(data, function (res) {
            if (res.status == "SUCCESS") {
                hlp.myalert(res.message);

                $.afui.goBack();
            } else {
                hlp.log("svc.editAddressList failed. message:" + res.message);

                hlp.myalert("更新地址失败");
            }
        });
    };
};

// 设置默认售后地址
function SetAsDefaultAddress() {
    "use strict";

    hlp.log("SetAsDefaultAddress() Called. UserName:" + loj.UserId);

    var addressId = $("#addressEdit #editAddressForm input[name=address_id]").val();

    svc.setDefaultAddress(addressId, loj.UserId, function (res) {
        if (res.status == "SUCCESS") {
            hlp.log(res.message);

            hlp.myalert("设置默认地址成功");

            $.afui.goBack();
        } else {
            hlp.log("svc.setDefaultAddress failed. message:" + res.message);

            hlp.myalert("设置默认地址失败");
        }
    });
};

// 编辑收货地址 删除
function DelAddress() {
    "use strict";

    $("#addressEdit div.layOutDel").css({display: "_blank", opacity: "0"});
    $("#addressEdit div.layOutDel").fadeTo("fast", 1);
};

// 签到
function DoCheckIn() {
    "use strict";

    svc.doCheckIn(loj.UserId, function (res) {
        if (res.status == "SUCCESS") {
            $.afui.loadContent("#checkinSuccess");
        } else {
            hlp.myalert("签到失败");
        }
    });
};

// 提交评价
function SubmitEvaluation(type) {
    "use strict";

    hlp.log("Call SubmitEvaluation() type:" + type);
    
    // "user_id":"15397668177",
    // "order_sn":"15062515444542961695", 
    // "goods_sn":"FS360", 
    // "comment_rank":"5", 
    // "content":"非常好用！", 
    // "comment_img":"/sources/goods/A01/A01_big.jpg"

    var getStarCount = function (starJq) {
        var star = 0;
        $(starJq).each(function() {
            if ($(this).attr("class") == "star") {
                star++;
            }
        });

        return star.toString();
};

    var orderSn;
    var goodSn;
    var commentRank;
    var content;
    if (type == "0") {
        orderSn = $("#evaluationSubmitDiv input#evaluationSubmitOrderSn").val();
        goodSn = $("#evaluationSubmitDiv input#evaluationSubmitGoodSn").val();
        commentRank = getStarCount("#evaluationSubmitDiv div#evaluationSubmit_comment_rank div");
        content = $("#evaluationSubmitDiv textarea#evaluationSubmit_textarea").val();
        svc.addComment(loj.UserId, orderSn, goodSn, commentRank, content, type, "", function (res) {
            hlp.myalert("发表评价成功");
            $.afui.goBack();
        });
    } else {
        orderSn = $("#evaluateMoreDiv input#evaluateMoreOrderSn").val();
        goodSn = $("#evaluateMoreDiv input#evaluateMoreGoodSn").val();
        commentRank = getStarCount("#evaluateMoreDiv div#evaluateMore_comment_rank div");
        content = $("#evaluateMoreDiv textarea#evaluateMore_textarea").val();

        var commentId = $("#evaluateMoreDiv input#evaluateMoreCommentId").val();

        svc.addComment(loj.UserId, orderSn, goodSn, commentRank, content, type, commentId, function (res) {
            hlp.myalert("追加评价成功");
            $.afui.goBack();
        });
    }
};

// 初始化地址选择器
// provinceJq： 选择省所用的select标签的jquery选择器字串
// provinceElemId： 选择省所用的select标签的ID
// cityJq： 选择市所用的select标签的jquery选择器字串
// cityElemId： 选择市所用的select标签的ID
// districtJq： 选择市区所用的select标签的jquery选择器字串
// districtElemId： 选择市区所用的select标签的ID
// templateId： 模板标签ID
// addressInfo: addressInfo.province, addressInfo.city, addressInfo.district
function InitAddressSelects(provinceJq, provinceElemId, cityJq, cityElemId, districtJq, districtElemId, templateId, addressInfo) {
    svc.getRegionList(1, 1, function (res) {
        hlp.bindtpl(res.data, "#" + provinceElemId, templateId);

        if (addressInfo && addressInfo != null && typeof (addressInfo) != "undefined" && addressInfo.province && addressInfo.province != "") {
            $(provinceJq).val(addressInfo.province);

            svc.getRegionList(addressInfo.province, 2, function (res2) {
                hlp.bindtpl(res2.data, "#" + cityElemId, templateId);

                if (addressInfo.city && addressInfo.city != "") {
                    $(cityJq).val(addressInfo.city);
                }

                svc.getRegionList(addressInfo.city, 3, function (res3) {
                    hlp.bindtpl(res3.data, "#" + districtElemId, templateId);

                    if (addressInfo.district && addressInfo.district != "") {
                        $(districtJq).val(addressInfo.district);
                    }
                });
            });
        }

        $(provinceJq).bind("change", function (e) {
            var selectedProvinceValue = $(this).val();
            hlp.log(provinceJq + " change event handled. selected value:" + selectedProvinceValue);

            $(cityJq).val("-1");
            $(districtJq).val("-1");

            if (selectedProvinceValue == "-1") {
                return;
            }

            svc.getRegionList(selectedProvinceValue, 2, function (res1) {
                hlp.bindtpl(res1.data, "#" + cityElemId, templateId);

                $(cityJq).bind("change", function (e) {
                    var selectedCityValue = $(this).val();
                    hlp.log(cityJq + " change event handled. selected value:" + selectedCityValue);

                    $(districtJq).val("-1");

                    if (selectedCityValue == "-1") {
                        return;
                    }

                    svc.getRegionList(selectedCityValue, 3, function (res2) {
                        hlp.bindtpl(res2.data, "#" + districtElemId, templateId);
                    });
                });
            });
        });
    });
};

var ReturnsStatusMapping = {
    "0": "取消",
    "1": "已提交",
    "2": "已受理",
    "3": "已完成"
};

var addressFromVaildOptions = {
    rules: {
        address_consignee: {
            required: true,
            maxlength: 20
        },
        address_province: {
            checkAddressSelectionRequire: true
        },
        address_city: {
            checkAddressSelectionRequire: true
        },
        address_district: {
            checkAddressSelectionRequire: true
        },
        address_address: {
            required: true,
            maxlength: 60,
            minlength: 5,
            regularExpressCheck: /^.*[^\d].*$/
        },
        //address_zipcode: {
        //    digits: true,
        //    maxlength: 6,
        //    minlength: 6
        //},
        address_tel: {
            regularExpressCheckNullable: /^([0-9]{3,4}-)?[0-9]{7,8}$/
        },
        //address_mobile: {
        //    required: true,
        //    digits: true,
        //    maxlength: 11
        //},
        address_zipcode: {
            regularExpressCheck: /^[0-9][0-9]{5}$/
        },
        address_mobile: {
            regularExpressCheck: /^0{0,1}(13[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9]{8}$/
        }

    },
    onfocusout: false,
    onclick: false,
    messages: {
        address_consignee: {
            required: "请填写姓名",
            maxlength: "姓名请保持在20个字符以内"
        },
        address_province: {
            checkAddressSelectionRequire: "请选择省"
        },
        address_city: {
            checkAddressSelectionRequire: "请选择市"
        },
        address_district: {
            checkAddressSelectionRequire: "请选择市区"
        },
        address_address: {
            required: "请输入详细地址",
            maxlength: "地址内容太长",
            minlength: "地址内容太短",
            regularExpressCheck: "地址不能为纯数字"
        },
        //address_zipcode: {
        //    digits: "邮编请输入数字",
        //    maxlength: "邮编请输入6位数字"
        //},
        address_tel: {
            regularExpressCheckNullable: "请输入正确的电话号码"
        },
        //address_mobile: {
        //    required: "请输入手机号码",
        //    digits: "手机号码请输入数字",
        //    maxlength: "手机号码请输入11位数字"
        //},
        address_zipcode: {
            regularExpressCheck: "邮编请输入6位数字"
        },
        address_mobile: {
            regularExpressCheck: "请输入正确的11位数字作为手机号码"
        }
    }
};

//function OpenMyFavouriteLayOutDel(e) {
//    $(".layOutDel").removeAttr("style");
//    $(".layOutDel").attr("style", "display: blank; -ms-opacity: 0; opacity: 0;");
//    $(".layOutDel").fadeTo("slow", 1);
//};