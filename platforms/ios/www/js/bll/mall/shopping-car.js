$(function () {

    $.afui.launch();

    // 在线支付
    $("#pay").on("panelload", function (e) {
        hlp.log("before call get pay type");
        var panelObj = hlp.panelObj["payInformation"];
        hlp.bindtpl(panelObj,"#orderDetailInfo","tpl_orderdetail");
        hlp.bindtpl(panelObj,"#orderPrice","tpl_orderprice");
        svc.getPayType(function(r) {
             if (r.status == "SUCCESS") {
                 hlp.bindtpl(r.data,"#payType","tpl_paytype");
                 $("#payType li").eq(0).attr("class","act");
                 $("#selectPayType").val($("#payType li").eq(0).attr("id"));
                 var payType = $("#payType li");
                 payType.off("tap").on("tap", function () {
                     $.each(payType, function(index) {
                         payType.eq(index).removeClass("act");
                     });
                     $(this).attr("class","act");
                     $("#selectPayType").val($(this).attr("id"));
                 });
                 $("#actionPay").off("tap").on("tap", function () {
                     var orderSn = $(".payOrderId").val();
                     var payType = $("#selectPayType").val();
                     var payTime = new Date().getTime();
                     var url = pay_url + "gopay&pay_code=" + payType + "&order_sn=" + orderSn + "&time=" + payTime;
                     //调用InAppBrowser方法。弹出内置浏览器
                     var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
                     ref.addEventListener('exit', function () {
                         //判断是否成功调用并跳转到相应的页面
                         svc.getPayStatus(orderSn, function(r) {
                             if (r.status == "SUCCESS") {
                                 hlp.panelObj["order"] = { "sn": orderSn };
                                 $.afui.loadContent("#orderDetail1");
                             } else {
                                 hlp.myalert("支付失败!");
                             }
                         });
                     });
                     //下面这里注册一个监听事件, 保证支付宝和银联支付在支付完成后可以关闭InAppBrowser.
                     ref.addEventListener('loadstop', function (event) {
                         //alert(event.url);
                         //alert(payType);
                         if (payType == "alipay") {
                             if (event.url.indexOf("cashierPay.htm") > -1) {
                                 ref.close();
                             }
                         } else if (payType == "unionpay"){
                             if (event.url.indexOf("callback.action") > -1) {
                                 ref.close();
                             }
                         }
                     });
                 });
                 $("#cancelPay").off("tap").on("tap", function () {
                     hlp.panelObj["order"] = { "sn": $(".payOrderId").val() };
                     $.afui.loadContent("#unpayedOrder");
                 });
             } else {
                hlp.myalert(r.message);
             }
         });
    });

    //免注册购买
    $("#notLoginBuy").off("panelload").on("panelload",function(){
        var registerFlg=false;
        //验证码按钮
        $("#notLoginBuySendCode").off("tap").on("tap", function () {
            var mPoneNumber=$("#notLoginMPoneNumber").val();
            //check用户有没有注册，注册:FAILURE,未注册：SUCCESS
            notLoginBuyerGetNumber();
            hlp.log("before call shopping-car.js userCheck");
            svc.userCheck(mPoneNumber, function(userCheck_result) {
                hlp.log("inside call shopping-car.js userCheck");
                if (userCheck_result.status == "SUCCESS") {//未注册
                    hlp.log(userCheck_result.message);
                    registerFlg=false;
                }else if(userCheck_result.code=="104"){//已注册
                    registerFlg=true;
                    //发送验证码
                    hlp.log("before call shopping-car.js forgerPassSend");
                    svc.forgerPassSend(mPoneNumber, function(r){
                        hlp.log("inside call shopping-car.js forgerPassSend");
                        if (r.status == "SUCCESS"){
                            hlp.log(r.message);
                        }else{
                            hlp.log(r.message);
                        }
                    });
                }
            });
        });
        //免注册购买提交按钮事件
        $("#notLoginBuyBtnConfirm").off("tap").on("tap", function () {
            var notLoginVericode=$("#notLoginVericode").val();
            var mPoneNumber=$("#notLoginMPoneNumber").val();
            if(notLoginVericode==""){
                hlp.myalert("请填写验证码！");
            }else{
                //自动登录成功
                var codeLoginSuccessCallback=function(){
                    var userId=loj.UserId;
                    getDefaultAddress(userId,
                        function(getDefaultAddress_res){
                            $.afui.loadContent("#submitOrder");
                        },
                        function(message){
                            $.afui.loadContent("#addressSelect");
                        });
                };

                //密码登录成功
                var passwordLoginSuccessCallback=function(){
                    hlp.panelObj["notLoginBuyMobile"]={"mobile":mPoneNumber};
                    $.afui.loadContent("#addressAdd");
                };

                //点击确认
                if(registerFlg){
                    //用户已注册，自动登录
                    codeLogin(mPoneNumber,notLoginVericode,codeLoginSuccessCallback, undefined);
                }else{
                    //用户未注册，自动注册并登录
                    //自动注册
                    hlp.log("before call shopping-car.js userRegister");
                    svc.userRegister(mPoneNumber, mPoneNumber, notLoginVericode, notLoginVericode, function(userRegister_res){
                        hlp.log("inside call shopping-car.js userRegister");
                        if (userRegister_res.status == "SUCCESS") {
                            hlp.log(userRegister_res.message);
                            passwordLogin(mPoneNumber, notLoginVericode,passwordLoginSuccessCallback, undefined);
                        } else {
                            hlp.log(userRegister_res.message);
                        }
                    });
                }
            }
        });
    });

    //提交订单
    $("#submitOrder").off("panelload").on("panelload",function(){
        //画面初始化
        $("#integralDiv").css("display","block");
        $("#showIntegralDiv").attr("class","orderBg orderBg2 canshu showcanshu")
        $("#goodList").css("display","block");
        $("#div_submitOrder_goods").attr("class","orderBg orderBg2 canshu showcanshu");
        $("#person").attr("class","cur");
        $("#company").removeClass("cur");
        $("#companyName").hide();
        $("#submitOrderCheckbox").removeClass("checked");
        $("#integral").val("");
        $("#integral").attr("readonly","readonly");

        //hlp.panelObj["goods"] = {"good":[{ "sku_sn":"6949123303602","sn":"FS360", "num": 1 },{ "sku_sn":"6949123352112","sn":"FR5211", "num": 2 },{ "sku_sn":"6949123358022","sn":"FC5802", "num": 1 }],"isCart":"0"};
        var goodsOdj=hlp.panelObj["goods"];
        if(!goodsOdj){
            hlp.myalert("没有购买的商品！");
            return;
        }
        var tokenId=loj.Credential;
        var userId=loj.UserId;
        var goods=goodsOdj.good;
        var addressId="";
        var invType="0";
        var companyName="";
        var isCart="0";
        var freight=0;

        //发票
        $("#invoice a").off("tap").on("tap", function () {
            var this_id = $(this).attr("id");
            if(this_id=="person"){
                $("#company").removeClass("cur");
                $(this).attr("class","cur");
                $("#companyName").attr("style", "display: none");
            }else{
                $("#person").removeClass("cur");
                $(this).attr("class","cur");
                $("#companyName").attr("style", "display: block");
            }
        });

        //默认地址获取失败
        var failedCallBack=function(message){
            $.afui.loadContent("#addressSelect");
            hlp.log(message);
        };
        //默认地址获取成功
        var getDefaultAddressSucceedCallBack=function(success_res){
            var data_address=success_res.data;
            if(data_address){
                var address=data_address.province_name+" "+data_address.city_name+" "+data_address.district_name+" "+data_address.address+" "+"("+data_address.zipcode+")";
                var mobileAndName=data_address.consignee+" "+data_address.mobile;
                var defaultAddress={"address":address,"mobileAndName":mobileAndName};
                hlp.panelObj["selectAddressId"]={"address_id":data_address.address_id};
                hlp.bindtpl(defaultAddress, "#div_submitOrder_address", "tpl_submitOrder_address");
                addressId=data_address.address_id;
                //获取商品清单
                getGoodsSimpleInfo(goods,
                    function(sum_price,sum_price_isSpecial){
                        //成功获取包邮标准的callback
                        var getBaoYouLineSuccessCallback=function(baoYouLine){
                            //邮费
                            var shipping_fee=parseFloat(baoYouLine.shipping_fee);
                            //包邮标准
                            var payLine=parseFloat(baoYouLine.promo);
                            //成功获取积分信息的callback
                            var getIntegralSuccessCallback=function(integral){
                                var priceCanUseIntegral=parseInt(sum_price-sum_price_isSpecial);//可用积分抵扣的钱
                                var useIntegralCutPrice=0;//用积分抵扣的钱
                                if(sum_price>=payLine){
                                    freight=0;
                                }else{
                                    freight=shipping_fee;
                                };
                                var integralObj={"all":integral,"canUse":priceCanUseIntegral};
                                if(integral<priceCanUseIntegral){
                                    integralObj.canUse=integral;
                                }

                                hlp.bindtpl(integralObj, "#div_submitOrder_integral", "tpl_submitOrder_integral");

                                //积分的checkBox
                                $("#submitOrderCheckbox").off("tap").on("tap", function () {
                                    if($(this).hasClass("checked")){
                                        $(this).removeClass("checked");
                                        $("#integral").attr("readonly","readonly");
                                        $("#integral").val("");
                                        $("#integralToCash").text("0");
                                        useIntegralCutPrice=0;//用积分抵扣的钱
                                        $('#integralToCash').text(useIntegralCutPrice);
                                        var sumTotalPrice=sum_price-useIntegralCutPrice+freight;
                                        var summation={"price":sum_price,"integralPrice":useIntegralCutPrice,"freight":freight,"sumTotalPrice":sumTotalPrice};//最后的结算
                                        hlp.bindtpl(summation, "#div_submitOrder_totalPrice", "tpl_submitOrder_totalPrice");

                                    }else{
                                        if(priceCanUseIntegral==0){
                                            hlp.myalert("购买特惠商品不可以使用积分！");
                                        }else{
                                            $(this).addClass("checked");
                                            $("#integral").removeAttr("readonly");
                                        }
                                    }
                                });
                                $('#integral').off("input").on("input", function () {
                                    var integral_now=$('#integral').val();
                                    if(isNaN(integral_now)){
                                        hlp.myalert("请输入数字！");
                                    }else{
                                        if(parseFloat(integral_now)>parseFloat(integral)){
                                            hlp.myalert("输入积分大于账户可用积分<br>请重新输入！");
                                        }else if(parseFloat(integral_now)>parseFloat(priceCanUseIntegral)){
                                            hlp.myalert("输入积分大于本订单最多可用积分<br>请重新输入！");
                                        }else{
                                            useIntegralCutPrice=integral_now/10;//用积分抵扣的钱
                                            $('#integralToCash').text(useIntegralCutPrice);
                                            var sumTotalPrice=sum_price-useIntegralCutPrice+freight;
                                            var summation={"price":sum_price,"integralPrice":useIntegralCutPrice,"freight":freight,"sumTotalPrice":sumTotalPrice};//最后的结算
                                            hlp.bindtpl(summation, "#div_submitOrder_totalPrice", "tpl_submitOrder_totalPrice");
                                        }
                                    }
                                });
                                useIntegralCutPrice=parseFloat($('#integralToCash').text());//用积分抵扣的钱
                                var sumTotalPrice=sum_price-useIntegralCutPrice+freight;
                                var summation={"price":sum_price,"integralPrice":useIntegralCutPrice,"freight":freight,"sumTotalPrice":sumTotalPrice};//最后的结算
                                hlp.bindtpl(summation, "#div_submitOrder_totalPrice", "tpl_submitOrder_totalPrice");
                                $("#submitOrderPay").off("tap").on("tap", function () {
                                    var integral=$('#integral').val();
                                    var sumTotalPrice=$('#sumTotalPrice').text().split("元")[0];
                                    var submitOrderAddress=$('#submitOrderAddress').text();
                                    var addressInfo=submitOrderAddress.split(" (")[0];
                                    var personalInfo=submitOrderAddress.split(")")[1];
                                    if($("#company").attr("class")=="cur"){
                                        invType="1";
                                        companyName=$("#companyName").val();
                                    }else{
                                        invType="0";
                                        companyName="";
                                    };
                                    hlp.panelObj["payInformation"] = {
                                        "orderId": "",
                                        "orderPrice": sumTotalPrice,
                                        "addressInfo":addressInfo ,
                                        "personalInfo": personalInfo,
                                        "invoice": invType
                                    };
                                    hlp.log("before call shopping-car.js addOrder");
                                    svc.addOrder(userId,addressId,goods,invType,companyName,integral,isCart,function(r){
                                        hlp.log("inside call shopping-car.js addOrder");
                                        if (r.status == "SUCCESS") {
                                            hlp.log(r.message);
                                            hlp.panelObj["payInformation"].orderId= r.data.order_sn;
                                            $.afui.loadContent("#pay");
                                        }else{
                                            hlp.myalert(r.message);
                                        }
                                    })
                                });
                            };
                            //获取积分
                            getIntegral(tokenId,getIntegralSuccessCallback,undefined);
                        };
                        getBaoYouLine(getBaoYouLineSuccessCallback,undefined);

                    },
                    failedCallBack);
            }else{
                //$.afui.loadContent("#addressSelect");
                hlp.myalert("地址获取失败！");
            }
        };
        //选择的AddressId
        var selectAddressId=hlp.panelObj["selectAddressId"];
        if(!selectAddressId){
            //获取默认地址
            getDefaultAddress(userId,getDefaultAddressSucceedCallBack, failedCallBack);
        }else{
            //获取选择的地址
            getSelectedAddress(userId,selectAddressId.address_id,getDefaultAddressSucceedCallBack, failedCallBack);
        };
    });

    $("#submitOrder").on("panelunload", function (e){
        delete hlp.panelObj["selectAddressId"];
    });

    //我的购物车
    $("#mallMyCart").on("panelload", function (e) {   
    	
        hlp.log("before call get my cart");
        
        //清空右上角购物车图标上的数字
        $('#mainview .shortCar #quantityNewInCart').val(0);
        $('#mainview .shortCar #quantityNewInCart').css("display","none");
        loj.QuantityInCart=0;
        
        if (!loj.IsLogin) { return; }
        svc.getMyCart(loj.UserName, function(r) {
            if (r.status == "SUCCESS") {
                hlp.bindtpl(r.data,"#cartGoodsList","tpl_cartgoodslist");
                
                //下面绑定方法
                //点击全选的方法
        		$('.checkAll').off('tap').on('tap',function(){
        			//首先得到全选框的当前状态 
        			var current;
        			if ($('#checkAll').hasClass('checked')){
        				current='checkAll';
        				$('#checkAll').removeClass('checked');
        			}else{
        				current='notCheckAll';
        				$('#checkAll').addClass('checked');
        			}
        			//首先得到checkbox 列表 	
        			var checkList = $('li #checkbox');
        			//如果当前是选中，那么本次点击就是取消。如果当前没有选中，那么本次点击就是选中
        			for(var i=0;i<checkList.length;i++){
        				if(current=='notCheckAll'){
        					checkList.eq(i).addClass('checked');
        				}else{
        					checkList.eq(i).removeClass('checked');
        				}	
        			}
        			
        			//刷新总金额
        			refreshTotalCount();
        
        		});
                //点击某一条商品的check box,如果是取消，则要把checkAll也置为not checked
        		$('li div#checkbox').off('tap').on('tap',function(){
        			var current;
        			//获得点击前的状态，选中或未选中
        			if($(this).hasClass('checked')){
        				current='checked';
        				$(this).removeClass('checked');
        			}else{
        				current='unchecked';
        				$(this).addClass('checked');
        			}
        			
        			//如果之前是选中，那么此次就是取消，那么就要将checkAll的状态置为未选中
        			$('#checkAll').removeClass('checked'); 	
        			
        			//刷新总金额
        			refreshTotalCount();
        		});
        		
        		//点击删除，从购物车中把这条商品删除并刷新该页面
        		$('li a.del').off('tap').on('tap',function(){
        			//调用方法，删除该商品
        			hlp.log('delete goods in my cart');
        			var rec_id;
        			rec_id=$(this).parent().attr("id");
        			svc.deleteGoodsInMyCart(loj.UserName,rec_id, function(r){
        				if(r.status=='SUCCESSE'){
        					//删除成功,重新加载该页面
        					$.afui.loadContent('#mallMyCart');
        					
        				}else{
        					//删除失败
        					alert('删除商品失败!');
        				}
        			
        			});
        			
        		});
        		
        		//点击清空购物车，会把购物车进行清空，所有商品都删除
        		$('div.delAll').off('tap').on('tap',function(){
        			//调用方法，清空购物车
        			hlp.log('clean my cart');
        			svc.clearnMyCart(loj.UserName,function(r){
        				if(r.status=='SUCCESS'){
        					//删除成功,重新加载该页面
        					$.afui.loadContent('#mallMyCart');
        					
        				}else{
        					//删除失败
        					alert('删除商品失败!');
        				}
        			});
        		});
        		
        		//点击立即购买
        		$('.fixedBuy a').off('tap').on('tap',function(){
        			var tokenId=loj.Credential;
        			var s="";
        			var sku_sn;
        			var goods_sn;
        			var quantity;
        			var length;
        			var goodCartList=[];
        			//遍历所有记录
        			$('#cartGoodsList li div#checkbox').each(function(){
        				if($(this).hasClass('checked')){
        					//只统计选中的记录
        					sku_sn=$(this).attr('sku_sn');
        					goods_sn=$(this).attr('goods_sn');
        					quantity=$(this).parent().find('div.putNum input').val();
        					s={"sku_sn":sku_sn,"sn":goods_sn,"num":quantity};
        					goodCartList.push(s);       				
        				}
        			});        			
        			   
        			
        			  			
        			hlp.panelObj["goods"]={"good":goodCartList,"isCart":"1"};
        			
        			if(tokenId){
        				$.afui.loadContent('#submitOrder');
        			}else{
        				$.afui.loadContent('#buyWithoutRegist');
        			}
        		});
                
                
                
                //现在统计下总金额
                var count=r.data.length;
                var price;
                var quantity;
                var totalPrice=parseFloat(0.00);
                for(var i=0;i<count;i++){
                	price=parseFloat(r.data[i].goods_price);
                	quantity=parseInt(r.data[i].goods_number);
                	totalPrice=totalPrice+price*quantity;                
                } 
                $('#totalMoney').text(totalPrice);
            } else {
                $("#cartGoodsList")[0].innerHTML = '<p align="center" class="topMessage"><a href="#">您还没有加入商品!</a></p>';
            }
        });
        
        
        
        
    });
});
//获取默认地址
var getDefaultAddress=function(userId,succeedHandler, failedHandler){
    hlp.log("before call shopping-car.js getDefaultAddress");
    svc.getDefaultAddress(userId, function(getDefaultAddress_res){
        hlp.log("inside call shopping-car.js getDefaultAddress");
        if (getDefaultAddress_res.status == "SUCCESS") {
            hlp.log(getDefaultAddress_res.message);
            //var data_address=r.data;
            if(succeedHandler){
                succeedHandler(getDefaultAddress_res);
            }
        }else{
            if(failedHandler){
                failedHandler(getDefaultAddress_res.message);
            }
        }
    });
};

//获取选择的地址
var getSelectedAddress=function(userId,address_id,succeedHandler, failedHandler){
    hlp.log("before call shopping-car.js getAddressList with addressId");
    svc.getAddressListByAddressId(userId, address_id, function(getSelectedAddress_res){
        hlp.log("inside call shopping-car.js getAddressList with addressId");
        if (getSelectedAddress_res.status == "SUCCESS") {
            hlp.log(getSelectedAddress_res.message);
            if(succeedHandler){
                succeedHandler(getSelectedAddress_res);
            }
        }else{
            if(failedHandler){
                failedHandler(r.message);
            }
        }
    });
};

//提交表单，商品清单
var getGoodsSimpleInfo=function(goods,succeedHandler, failedHandler){
    //产品种类数
    var typeSum=goods.length;
    var sn=[];
    var snString="";
    for(var i=0;i<typeSum;i++){
        if(snString==""){
            snString= goods[i].sn;
        }else{
            snString=snString+","+goods[i].sn;
        }
    };
    hlp.log("before call shopping-car.js getGoodsSimpleInfo");
    svc.getGoodsSimpleInfo(snString,function(r){
        hlp.log("inside call shopping-car.js getGoodsSimpleInfo");
        if (r.status == "SUCCESS") {
            hlp.log(r.message);
            var goodsSimpleInfoList= r.data;
            var sum_price_isSpecial=0;
            var sum_price=0;
            var num=0;
            for(var i=0;i<goodsSimpleInfoList.length;i++){
                for(var j=0;i<typeSum;i++){
                    if(goodsSimpleInfoList[i].goods_sn==goods[i].sn){
                        var sum=parseFloat(goods[i].num);
                        var price=parseFloat(goodsSimpleInfoList[i].shop_price);
                        var totalPrice=price * sum;
                        num=num+sum;
                        goodsSimpleInfoList[i]["sum"]=sum;
                        goodsSimpleInfoList[i]["totalPrice"]=totalPrice;
                        sum_price=sum_price+totalPrice;
                        if(goodsSimpleInfoList[i].is_special==1){
                            sum_price_isSpecial=sum_price_isSpecial+totalPrice;
                        }
                    }
                };
            };
            var submitOrder_goods_data={"num":num,"goodsSimpleInfoList":goodsSimpleInfoList};
            hlp.bindtpl(submitOrder_goods_data, "#div_submitOrder_goods", "tpl_submitOrder_goods");
            if(succeedHandler){
                succeedHandler(sum_price,sum_price_isSpecial);
            }
        }else{
            if(failedHandler){
                failedHandler(r.message);
            }
        }
    });
};

//可用积分
var getIntegral=function (tokenId,succeedHandler, failedHandler){
    hlp.log("before call shopping-car.js getIntegral");
    svc.getintegraln(tokenId,function(r){
        hlp.log("inside call shopping-car.js getIntegral");
        if (r.status == "SUCCESS") {
            hlp.log(r.message);
            if(r.userIntegral=="empty"){
                var integral="0";
            }else{
                var integral=parseFloat(r.userIntegral);
                if(succeedHandler){
                    succeedHandler(integral);
                }
            }
        }else{
            hlp.myalert(r.message);
            if(failedHandler){
                failedHandler();
            }
        }
    });
};

//验证码登录
var codeLogin=function(mPoneNumber,buyWithoutVericode,succeedHandler, failedHandler){
    hlp.log("before call shopping-car.js identifyCodeCheck");
    //check验证码是否正确
    svc.identifyCodeCheck(mPoneNumber, buyWithoutVericode, function(codeCheck_result) {
        hlp.log("inside call shopping-car.js identifyCodeCheck");
        if (codeCheck_result.status == "SUCCESS") {
            hlp.log(codeCheck_result.message);
            //验证码正确后，直接login
            svc.codeLogin(mPoneNumber, function(codeLogin_result) {
                if (codeLogin_result.status == "SUCCESS") {
                    codeLogin_result["userId"]=mPoneNumber;
                    loj.setOnline(codeLogin_result,"flyco");
                    hlp.log(hlp.format("Credential:{0}",[loj.Credential]));
                    hlp.log(hlp.format("UserId:{0}",[loj.UserId]));
                    hlp.log(hlp.format("LoginType:{0}",[loj.LoginType]));
                    hlp.myalert("已自动登录了您的飞科账户！");
                    refundApplyGetNumber();
                    if(succeedHandler){
                        succeedHandler();
                    };
                }else{
                    if(failedHandler){
                        failedHandler();
                    };
                    hlp.myalert("codeLogin result:"+codeLogin_result.message);
                }
            });
        }else{
            if(failedHandler){
                failedHandler();
            };
            hlp.myalert(codeCheck_result.message);
        }
    });
};

//密码登陆
var passwordLogin=function(mPoneNumber, buyWithoutVericode,succeedHandler, failedHandler){
    hlp.log("before call shopping-car.js userAuthentication");
    svc.userAuthentication(mPoneNumber, buyWithoutVericode, function(userAuthentication_res){
        hlp.log("inside call shopping-car.js userAuthentication");
        if (userAuthentication_res.status == "SUCCESS") {
            hlp.log( userAuthentication_res.message);
            loj.setOnline(userAuthentication_res,"flyco");
            hlp.log(hlp.format("Credential:{0}",[loj.Credential]));
            hlp.log(hlp.format("UserId:{0}",[loj.UserId]));
            hlp.log(hlp.format("LoginType:{0}",[loj.LoginType]));
            hlp.myalert("系统已经为您自动创建了飞科账户！"+"<br>"+"用户名为手机号，密码为验证码！");
            if(succeedHandler){
                succeedHandler();
            }
        }else{
            if(failedHandler){
                failedHandler();
            }
            hlp.log( userAuthentication_res.message);
        };
    });
};

//增&&减购买数量
var minusCount1 = function(recId){
    var quantityName="quantity"+recId;
    var quantity = $("#"+quantityName).val();
    if(quantity>1){
        quantity--;
        $("#"+quantityName).val(quantity);
    }
    
    //刷新总金额
    refreshTotalCount();
};
var plusCount1 = function(recId){
	var quantityName="quantity"+recId;
    var quantity = $("#"+quantityName).val();
    if(quantity>=1){
        quantity++;
        $("#"+quantityName).val(quantity);
    }
    
    //刷新总金额
    refreshTotalCount();
};

var refreshTotalCount = function(){
	var price=0.0;
	var totalPrice=0.0;
	var quantity=0;
	//取出所有记录
	$('#cartGoodsList li div#checkbox').each(function(){
		if( $(this).hasClass('checked')){
			//只统计选中的行
			price=parseFloat($(this).attr("price"));
			quantity=$(this).parent().find('.putNum input').val();
			totalPrice=totalPrice+price*quantity;		
		}
	});
	
	//将总金额显示
	$('.fixedBuy #totalMoney').text(totalPrice);
};

//获取包邮标准
var getBaoYouLine=function(succeedHandler, failedHandler){
    hlp.log("before call shopping-car.js getBaoYouLine");
    svc.getBaoYouLine(function(r){
        hlp.log("inside call shopping-car.js getBaoYouLine");
        if (r.status == "SUCCESS") {
            hlp.log(r.message);
            if(succeedHandler){
                succeedHandler(r.data);
            }
        } else {
            if(failedHandler){
                failedHandler();
            }
            hlp.log(r.message);
            hlp.myalert("添加地址失败");
        }
    });
};

//发送验证码的倒计时
var fgtHandler = 0;
var count = 60;
var SendCodeEnableFg = true;
var notLoginBuyerGetNumber = function () {
    SendCodeEnableFg = false;
    $("#notLoginBuySendCode").text(count + "秒后重发");
    $("#notLoginBuySendCode").addClass("disabled");
    count--;
    if (count > 0) {
        fgtHandler = setTimeout(notLoginBuyerGetNumber, 1000);
    } else {
        var mPoneNumber=$("#notLoginMPoneNumber").val();
        hlp.log("before call shopping-car.js deleteCode");
        svc.deleteCode(mPoneNumber,function(r){
            hlp.log("inside call shopping-car.js deleteCode");
            if(r.status=="SUCCESS"){
                hlp.log(r.message);
            }else{
                hlp.log(r.message);
            }
        });
        $("#notLoginBuySendCode").text("获取动态验证码");
        $("#notLoginBuySendCode").removeClass("disabled");
        SendCodeEnableFg = true;
        count = 60;
    }
};

//使用积分点击事件
var showIntegral = function(){
    if($("#integralDiv").is(":hidden")){
        $("#integralDiv").css("display","block");
        $("#showIntegralDiv").addClass("showcanshu");
    }else{
        $("#integralDiv").css("display","none");
        $("#showIntegralDiv").removeClass("showcanshu");
    }
};

//商品清单点击事件
var showGoodList = function(){
    if($("#goodList").is(":hidden")){
        $("#goodList").css("display","block");
        $("#div_submitOrder_goods").addClass("showcanshu");
    }else{
        $("#goodList").css("display","none");
        $("#div_submitOrder_goods").removeClass("showcanshu");
    }
};