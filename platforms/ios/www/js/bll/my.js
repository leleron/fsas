$.afui.ready(function () {

    //登录页面
    $("#login").on("panelload",function(e){
        //登录功能
        $("#doLogin").off("tap").on("tap",function(){
            var userName = $("#userName").val();
            var passWord = $("#userPassWord").val();
            hlp.log("before login call...");
            hlp.log(hlp.format("UserName:{0},Password:{1}",[userName,passWord]));
            svc.userAuthentication(userName,passWord,function(r){
                hlp.log("inside login call...");
                if(r.status=="SUCCESS"){
                    r["userId"]=userName;
                    loj.setOnline(r,"flyco");
                    hlp.log(hlp.format("Credential:{0}",[loj.Credential]));
                    hlp.log(hlp.format("LoginType:{0}",[loj.LoginType]));
					
                    if (hlp.lastPage != "") {
                        var t = hlp.lastPage;
                        hlp.lastPage = "";
                        $.afui.loadContent(t);
                    }
                    else
                        $.afui.goBack();
						
                }else{
                    hlp.myalert(r.message);
                }
            });
        });

        //点击注册按钮跳转到注册发送验证码页面
        $("#doRegister").off("tap").on("tap",function(){
            $.afui.loadContent("#regist");
        });

        //京东登录
        $("#jd_Login").off("tap").on("tap",function(){
            hlp.log("before jdLogin function...");
            jdLogin(function(result){
                hlp.log("inside jdLogin function...");
                hlp.log(hlp.format("jdLoginResult:{0}",[result]));
                var uid = result.uid;
                var accessToken = result.accesstoken;
                var loginType = "jd";
                hlp.log("before thirdPartyLoginIn call...");
                svc.thirdPartyLoginIn(loginType,uid,accessToken,function(r){
                    hlp.log("inside thirdPartyLoginIn call...");
                    if(r.status=="SUCCESS"){
                        loj.setOnline(r,loginType);
                        hlp.log(hlp.format("Credential:{0}",[loj.Credential]));
                        hlp.log(hlp.format("LoginType:{0}",[loj.LoginType]));
                        $.afui.loadContent("#my");
                    }else{
                        hlp.myalert(r.message);
                    }
                });
                hlp.myalert("uid:  " +uid  +"accessToken:   "+ accessToken);
            },function(error){
                hlp.myalert(error);
            });
        });

        //微信登录
        $("#wx_Login").off("tap").on("tap",function(){
            hlp.log("before wxLogin function...");
            wxLogin(function(result){
                hlp.log("inside wxLogin function...");
                hlp.log(hlp.format("wxLoginResult:{0}",[result]));
                var uid = result.uid;
                var accessToken = result.accesstoken;
                var loginType = "wechat";
                hlp.log("before thirdPartyLoginIn call...");
                svc.thirdPartyLoginIn(loginType,uid,accessToken,function(r){
                    hlp.log("inside thirdPartyLoginIn call...");
                    if(r.status=="SUCCESS"){
                        loj.setOnline(r,loginType);
                        hlp.log(hlp.format("Credential:{0}",[loj.Credential]));
                        hlp.log(hlp.format("LoginType:{0}",[loj.LoginType]));
                        $.afui.loadContent("#my");
                    }else{
                        hlp.myalert(r.message);
                    }
                });
                hlp.myalert("uid:  " +uid  +"accessToken:   "+ accessToken);
            },function(error){
                hlp.myalert(error);
            });
        });

        //QQ登录
        $("#qq_Login").off("tap").on("tap",function(){
            hlp.log("before qqLogin function...");
            qqLogin(function(result){
                hlp.log("inside qqLogin function...");
                hlp.log(hlp.format("qqLoginResult:{0}",[result]));
                var uid = result.uid;
                var accessToken = result.accesstoken;
                var loginType = "qq";
                hlp.log("before thirdPartyLoginIn call...");
                svc.thirdPartyLoginIn(loginType,uid,accessToken,function(r){
                    hlp.log("inside thirdPartyLoginIn call...");
                    if(r.status=="SUCCESS"){
                        loj.setOnline(r,loginType);
                        hlp.log(hlp.format("Credential:{0}",[loj.Credential]));
                        hlp.log(hlp.format("LoginType:{0}",[loj.LoginType]));
                        $.afui.loadContent("#my");
                    }else{
                        hlp.myalert(r.message);
                    }
                });
                hlp.myalert("uid:  " +uid  +"accessToken:   "+ accessToken);
            },function(error){
                hlp.myalert(error);
            });
        });
    });

    //注册发送验证码页面
    $("#regist").on("panelload", function(e) {
        // 清空输入框的内容 开发缺陷 #346
        $("#userAccount").val("");
        $("#vericode").val("");

        //用户验证
        $("#sendCode").off("tap").on("tap", function() {
            if (SendCodeEnableFg) {
                var mobile = $("#userAccount").val();
                if(mobile == ""){
                    hlp.myalert("请输入手机号！");
                }else{
                    if(isNaN(mobile)){
                        hlp.myalert("请检查手机号是否正确！");
                    }else{
                        if (mobile.length == 11) {
                            hlp.log("before userCheck call...");
                            hlp.log(hlp.format("Mobile:{0}", [mobile]));
                            registerGetNumber(mobile);
                            svc.userCheck(mobile, function(r) {
                                hlp.log("inside userCheck call...");
                                if (r.status == "SUCCESS") {
                                    hlp.log("userCheck request success...");
                                    // hlp.myalert(r.message);
                                } else {
                                    hlp.myalert(r.message);
                                    clearRegTm();
                                }
                            });
                        }
                    }
                };
            }
        });
        //验证码验证
        $("#toRegistPassword").off("tap").on("tap", function() {
            var mobile = $("#userAccount").val();
            var vericode = $("#vericode").val();
            hlp.log("before identifyCodeCheck call...");
            svc.identifyCodeCheck(mobile, vericode, function(r) {
                hlp.log("inside identifyCodeCheck call...");
                hlp.log(hlp.format("Mobile:{0},IdentifyCode:{1}", [mobile, vericode]));
                if (r.status == "SUCCESS") {
                    hlp.log("identifyCodeCheck request success...");
                    $.afui.loadContent("#registPassword");
                } else {
                    hlp.myalert(r.message);
                }
            });
        });
    });

    //注册页面
    $("#registPassword").on("panelload",function(e){

        //用户注册
        $("#userRegist").off("tap").on("tap",function(){
            var mobile = $("#userAccount").val();
            var userName = $("#userAccount").val();
            var passWord = $("#passWord").val();
            var vericode = $("#vericode").val();
            if(mobile.length=11){
                hlp.log("before userRegist call ....");
                hlp.log(hlp.format("userAccount:{0},passWord:{1}",[mobile,passWord]));
                svc.userRegister(userName,mobile,vericode,passWord,function(r){
                    hlp.log("inside userRegister call....");
                    if(r){
                        loj.setOnline(r);
                        hlp.log(hlp.format("Credential:{0}",[loj.Credential]));
                        $.afui.loadContent("#my");
                    }else{
                        hlp.myalert(r.message);
                    }
                });
            }
        });
    });

    //用户信息页面
    $("#my").on("panelload",function(e){
        //显示页脚
        $("footer").show();
        $.afui.setBackButtonVisibility(false);
        var tokenId = loj.Credential;
        hlp.log("before getuserinfo call ...xxx....");
        hlp.log(hlp.format("tokenId:{0}",[tokenId]));

        if(tokenId){
            //获取用户信息
            svc.getuserinfo(tokenId,function(r){
                hlp.log("inside getuserinfo call...");
                if(r.status == "SUCCESS"){
                    var result = r.result.OTHRE_USER_TO_THIS;
                    hlp.log("getuserinfo request success..yyy.");
                    console.log("before set:"+JSON.stringify(loj));
                    loj.setEntity(r.result);
                    console.log("after set:" + JSON.stringify(loj));
                    //hlp.bindtpl(r.result,"#Info","tpl_Info");
                    //hlp.bindtpl(r.result.MOBILE,"#currentAccount","tpl_currentAccount");
                    var imgSrc = r.result.IMAGE == "" ? "images/mypage/nouser.png" : "http://121.40.104.203:8080"+r.result.IMAGE;
					$("#myUserImage").attr("src", imgSrc);
                    $("#myUserName").text(r.result.USER_NAME);
                    $("#currentAccount").text(r.result.USER_NAME);
                    $("#currentAccountImg").attr("src", "images/icons-png/" + loj.LoginType + ".png");
                    hlp.log("R:" + JSON.stringify(result));
                    if(result != null)
                    $.each(result, function (i) {
                        var bindType = result[i];
                        switch (bindType) {
                            case "qq":
                                $("#qqAccountBind .bindInfo").text("解绑");
                                $("#qqAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                                break;
                            case "wechat":
                                $("#wxAccountBind .bindInfo").text("解绑");
                                $("#wxAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                                break;
                            case "jd":
                                $("#jdAccountBind .bindInfo").text("解绑");
                                $("#jdAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                                break;
                            case "flyco":
                                $("#fkAccountBind .bindInfo").text("解绑");
                                $("#fkAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                                break;
                            default:
                                break;
                        }
                    });
                    if(r.result.BINDED_FLYCO_ACCOUNT){
                        $("#qqAccountBind .bindInfo").text("解绑");
                        $("#qqAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                    }
                }
            });
            $("#myUserImage").off("tap").on("tap",function(){
                $.afui.loadContent("#myInfo");
            });
        }else{
            $("#myUserImage").attr("src","images/mypage/nouser.png");
            $("#myUserImage").off("tap").on("tap",function(){
                hlp.lastPage = "#my";
                $.afui.loadContent("#login");
            });
        }
    });

    //意见反馈页面
    $("#feedback").on("panelload",function(e){
        var tokenId = loj.Credential;
        hlp.log("before submitFeedback call...");
        //提交意见反馈
        $(".submitButton").off("tap").on("tap",function(){
            var feedbackContent = $("#textarea").val();
            var emailContent = $("#textinput").val();
            if(feedbackContent == ""){
                hlp.myalert("请输入意见内容");
            }else if(emailContent == ""){
                hlp.myalert("请填写邮箱");
            }else{
                svc.submitFeedback(tokenId,feedbackContent,emailContent,function(r){
                    hlp.log("inside submitFeedback call...");
                    if(r.status == "SUCCESS"){
                        hlp.myalert(r.message);
                        $("#feedbackContent").val("");
                        $("#emailContent").val("");
                        $.afui.loadContent("#my");
                    }
                });
            }
        });

    });

    //关于我们
    $("#aboutUs").on("panelload",function(e){
        var newTip = "";
        var currentVersion = $("#version").text();
        hlp.log("before getVersionInfo call..");
        //版本比较
        svc.getVersionInfo(currentVersion,function(r){
            hlp.log("inside getVersionInfo call...");
            if(r.status == "NEW"){
                newTip = r.message;
                $("#newTip").text(newTip);
                hlp.myalert(newTip);
            }
        });

        hlp.log("before getOtherLink call...");
        svc.getOtherLink(function(r){
            hlp.log("inside getOtherLink call...");
            if(r.status == "SUCCESS"){
                hlp.bindtpl(r.LinkList,"#otherLink","tpl_otherLink");
            }
        });
    });

    //重置密码发送验证码
    $("#forgetPassword").on("panelload",function(e){
        $("#forgetSendCode").off("tap").on("tap",function(){
            if(SendCodeEnableFg){
                var userMobile = $("#userMobile").val();
                hlp.log("before forgerPassSend call...");
                forgetPasswordGetNumber(userMobile);
                svc.forgerPassSend(userMobile,function(r){
                    hlp.log("inside forgerPassSend call...");
                    if(r.status == "SUCCESS"){
                        hlp.log("userCheck request success...");
                    }else{
                        hlp.myalert(r.message);
						clearFgtTm();
                    }
                });
            }
        });
        $("#toResetPassword").off("tap").on("tap",function(){
            var userMobile = $("#userMobile").val();
            var forgetVericode = $("#forgetVericode").val();
            hlp.log("before identifyCodeCheck call...");
            svc.identifyCodeCheck(userMobile,forgetVericode,function(r){
                hlp.log("inside identifyCodeCheck call...");
                hlp.log(hlp.format("Mobile:{0},IdentifyCode:{1}",[userMobile,forgetVericode]));
                if(r.status == "SUCCESS"){
                    hlp.log("identifyCodeCheck request success...");
                    $.afui.loadContent("#resetPassword");
                }else{
                    hlp.myalert(r.message);
                }
            });
        });
    });

    //重置密码
    $("#resetPassword").on("panelload",function(e){
        $("#passwordReset").off("tap").on("tap",function(){
            var userMobile = $("#userMobile").val();
            var resetPassword = $("#newPassWord").val();
            var resetPasswordConfirm = $("#newPassWordConfirm").val();
            if(resetPassword === resetPasswordConfirm){
                hlp.log("before restPassword call...");
                svc.resetPassword(userMobile,resetPassword,function(r){
                    hlp.log("inside restPassword call...");
					hlp.lastPage = "#deviceList";
                    $.afui.loadContent("#login");
                });
            }else{
                hlp.myalert("两次输入的密码不一致。");
            }
        });
    });

    //用户信息页面
    $("#myInfo").on("panelload",function(e){
        var tokenId = loj.Credential;
        hlp.log("before getuserinfo call...");
        svc.getuserinfo(tokenId,function(r){
            hlp.log("inside getuserinfo call...");
            if(r.status == "SUCCESS"){
                hlp.bindtpl(r.result,"#userInfo","tpl_userInfo");
				
                $("#myInfoName").off("tap").on("tap",function(){
                    $("#editUserName").val(loj.UserName);
                    $.afui.loadContent("#editName");
                });

                //修改用户名称
                $("#myInfoUpdate").off("tap").on("tap",function(){
                    var tokenId = loj.Credential;
                    var username = $("#editUserName").val();
                    var imageSrc = "";
                    hlp.log("before saveUpdate call...");
                    hlp.log(hlp.format("tokenId:{0},username:{1}",[tokenId,username]));
                    svc.updateUserInfo(tokenId,username,imageSrc,function(r){
                        $("#myInfoName").text(username);
                        hlp.log("inside saveUpdate call...");
                        $.afui.loadContent("#myInfo");
                    });
                });

                //用户退出登录
                $("#doLogout").off("tap").on("tap",function(){
                    hlp.log("before doLogout call...");
                    var tokenId = loj.Credential;
                    svc.userLoginOut(tokenId,function(r){
                        hlp.log("inside doLoginOut call...");
                        if(r.status == "SUCCESS"){
                            $("#myUserImage").attr("src","images/mypage/nouser.png");
                            $("#myUserName").text("");
                            loj.setOffline();
                            hlp.log("doLogout success , after setOffline... ");
                            $.afui.loadContent("#deviceList");
                        }
                    });
                });
            }
        });
    });
    //修改用户名称页面
    $("#editName").on("panelload",function(e){
        //修改用户名称
        $("#myInfoUpdate").on("tap",function(){
            var tokenId = loj.Credential;
            var username = $("#editUserName").val();
            var imageSrc = "";
            hlp.log("before saveUpdate call...");
            hlp.log(hlp.format("tokenId:{0},username:{1}",[tokenId,username]));
            svc.updateUserInfo(tokenId,username,imageSrc,function(r){
                hlp.log("inside saveUpdate call...");
                $.afui.loadContent("#myInfo");
            });
        });
    });


    //我的消息页面
    $("#userMessage").on("panelload", function () {
        var tokenId = loj.Credential;
        hlp.log("before getUserMessage call...");
        svc.getUserMessage(tokenId, function (r) {
            hlp.log("inside getUserMessage call...");
            if (r.status == "SUCCESS") {
                var result = r.result;
                $.each(result, function (i) {
                    //var settingType = Number(result[i].SETTINGTYPE);
                    //消息时间，格式为"2015-07-01 11:31:03.0"
                    var inputDate =result[i].messageReceiveTime;
                    //消息详细时间
                    var dtlDate="";
                    //result[i]["messageReceiveDtlTime"]=inputDate;
                    //var a=result[i].messageReceiveDtlTime;
                    //2015-07-01 11:31:03.0
                    //月/日 上午/下午 十二小时制时间点
                    //当前时间
                    var now = new Date();
                    var month = now.getMonth() + 1;
                    var day=now.getDate();
                    if(month<10){
                        month="0"+month;
                    };
                    if(day<10){
                        day="0"+day;
                    };
                    var n_yy=month + "/" + day;

                    //消息时间inputDateList[0]:年月日；inputDateList[1]：时间
                    var inputDateList =inputDate.split(" ");
                    //月日
                    var yy = inputDateList[0].substring(5,10);
                    yy=yy.replace("-","/")
                    //时间
                    var tt = inputDateList[1];
                    //小时
                    var hour = tt.split(":")[0];
                    //分
                    var min = tt.split(":")[1];
                    if (hour >= 12){
                        hour = hour - 12;
                        var hh = "下午" + hour +":" + min;
                    }else{
                        var hh  = "上午" + hour +":" + min;
                    };
                    dtlDate=yy+" "+hh;
                    result[i]["messageReceiveDtlTime"]=dtlDate;
                    if (n_yy == yy) {
                        //  result[i].messageReceiveTime = inputdate.split(" ")[1].substring(0,5);
                        result[i].messageReceiveTime = hh;
                    }else{
                        result[i].messageReceiveTime = yy;
                    }
                });
                hlp.bindtpl(r.result, ".usermessage", "tpl_myUserMessage");
                hlp.log("after bindtpl ...");
                var flg = false;
                //删除按钮
                $("a.archive").off("tap").on("tap", function () {
                    var flg = true;
                    var messageid1 = $(this).attr("id");
                    //var messageId = $(messagecontent.parentElement).find(".messageId").val();
                    svc.delUserMessage(tokenId, messageid1, function (r1) {
                        if  (r1.status == "SUCCESS") {
                            svc.getUserMessage(tokenId, function (r2) {
                                if  (r2.status == "SUCCESS") {
                                    hlp.bindtpl(r2.result, ".usermessage", "tpl_myUserMessage");
                                }
                            });
                        }
                    });
                });
                //if (flg = false) {
                $("div.swipe-content").off("tap").on("tap", function () {
                    //var myMessage = $($(this)[0].childElement)
                    var messageTitle = $(this).find(".messageTitle").val();
                    var messageContent = $(this).find(".messageContent").val();
                    var messageReceiveTime = $(this).find(".messageReceiveTime").val();
                    var messageReceiveDtlTime= $(this).find(".messageReceiveDtlTime").val();
                    var messageSender = $(this).find(".messageSender").val();
                    var messageId = $(this).find(".messageId").val();
                    hlp.panelObj["messageObj"] = {
                        "messageTitle": messageTitle,
                        "messageContent": messageContent,
                        "messageReceiveDtlTime": messageReceiveDtlTime,
                        "messageSender": messageSender
                    };
                    //消息已读
                    svc.updateUserMessage(tokenId, messageId, function (r) {
                        $.afui.loadContent("#userMessageDetail");
                    });
                });
                //}
            }
        });
    });
    //我的消息详细
    $("#userMessageDetail").on("panelload", function (e) {
        var pt = hlp.panelObj["messageObj"];
        if (pt) {
            hlp.bindtpl(pt, "#usermessage", "tpl_message");
        }
    });
    //手势密码设置
    $("#gesturePW").on("panelload", function (e) {
        hlp.bindtpl("请输入手势密码", "#gesturePw", "tpl_gesturepw");
        var patternpw = 0;
        var lock = new PatternLock('#patternContainer', {
            onDraw: function (pattern) {
                if (patternpw == 0) {
                    patternpw = pattern;
                    lock.reset();
                    hlp.bindtpl("请再输入手势密码", "#gesturePw", "tpl_gesturepw");
                } else {
                    if (pattern == patternpw) {
                        console.log("PATTERN:" + pattern);
                        loj.setpatternPw(pattern);
                        lock.reset();
                        hlp.bindtpl("输入手势密码成功", "#gesturePw", "tpl_gesturepw");
                        //$.afui.dismissView("#gesturePW",":dismiss");
                        $.afui.loadContent("#mySettings");
                    }
                    else {
                        loj.setpatternPw("0");
                        hlp.bindtpl("输入手势密码失败，请重新输入！", "#gesturePw", "tpl_gesturepw");
                        patternpw = 0;
                        lock.reset();
                    }

                }

            }
        });
    });
    //手势密码check
    $("#gesturePWsetting").on("panelload", function (e) {
        hlp.bindtpl("请输入手势密码", "#gesturePWset", "tpl_gesturepwset");
        var error_in = 4;
        var patternpw = loj.patternPw;
        var lock = new PatternLock('#patternContainerset', {
            onDraw: function (pattern) {
                if (pattern == patternpw) {
                    loj.setpatternPw(pattern);
                    lock.reset();
                    hlp.bindtpl("输入手势密码成功", "#gesturePWset", "tpl_gesturepwset");
                    //$.afui.dismissView("#gesturePW",":dismiss");
                    $.afui.loadContent("#deviceList");
                }
                else {
                    error_in = error_in - 1;
                    //loj.setpatternPw("0");
                    hlp.bindtpl("密码错误，还可以输入" + error_in + "次", "#gesturePWset", "tpl_gesturepwset");
                    lock.reset();
                    if (error_in <= 0) {
                        hlp.log("before doLogout call...");
                        var tokenId = loj.Credential;
                        svc.userLoginOut(tokenId, function (r) {
                            hlp.log("inside doLoginOut call...");
                            if (r.status == "SUCCESS") {
                                loj.setOffline();
                                hlp.log("doLogout success , after setOffline... ");
                                $.afui.loadContent("#login");
                            }
                        });
                    }
                }
            }
        });
    });
    //我的设置
    $("#mySettings").on("panelload",function(e){
        var tokenId = loj.Credential;
        hlp.log("before getMySetting call..");
        svc.getMySetting(tokenId,function(r){
            hlp.log("inside getMySetting call..");
            if (r.status == "SUCCESS") {
                var result = r.result;
                $.each(result, function (i) {
                    var settingType = Number(result[i].SETTINGTYPE);
                    var settingValue = Number(result[i].SETTINGVALUE);
                    switch (settingType) {
                        case 1: // 手势密码
                            mySetting(settingValue, $("#gesturePassword"));
                            break;
                        case 2: // 账号绑定
                            mySetting(settingValue, $("#accountBinding"));
                            break;
                        default:
                            break;
                    }
                });
            } else {
                hlp.myalert(r.message);
            }
        });
        $("#gesturePassword").off("click").on("click",function(){
            hlp.log("before setMySetting function...");
            setMySetting(1,$("#gesturePassword"));
        });
        $("#accountBinding").off("click").on("click",function(){
            hlp.log("before setMySetting function...");
            setMySetting(2,$("#accountBinding"));
        });
    });

    //账号绑定
    $("#accountBind").on("panelload",function(e){
        var tokenId = loj.Credential;
        if(loj.LoginType == "flyco"){
            $("#flyco").css("display","none");
            $(".thirdAccountli").css("display","block");
        }else{
            $(".thirdAccountli").css("display","none");
            $("#flyco").css("display","block");
        }

        //飞科账号绑定
        $("#fkAccountBind").off("tap").on("tap",function(){
            var loginType = "flyco";

            if($("#fkAccountBind .bindInfo").text() == "绑定"){
                $.afui.loadContent("#flycoAccountAuth");
            }else{
               hlp.log("before accountUnbind call function...");
               svc.accountUnbind(tokenId,function(r){
                   hlp.log("inside accountUnbind call function...");
                   if(r.status == "SUCCESS"){
                       hlp.log("accountUnbind request success...");
                       $("#fkAccountBind .bindInfo").text("绑定");
                       $("#fkAccountBind .minStatus").removeClass("minStatus").addClass("addStatus");
                   }else{
                       hlp.myalert(r.message);
                   }
               });
           }

        });

        //京东账号绑定
        $("#jdAccountBind").off("tap").on("tap",function(){
            var loginType = "jd";

            if($("#jdAccountBind .bindInfo").text() == "绑定"){
                hlp.log("before jdLogin function...");
                jdLogin(function(result){
                    hlp.log("inside jdLogin function...");
                    hlp.log(hlp.format("jdLoginResult:{0}",[result]));
                    var uid = result.uid;
                    var accessToken = result.accesstoken;
                    hlp.log("before flycoBindThirdParty call function...");
                    svc.flycoBindThirdParty(uid,loginType,tokenId,function(r){
                        hlp.log("inside flycoBindThirdParty call function...");
                        if(r.status == "SUCCESS"){
                            hlp.log("flycoBindThirdParty request success...");
                            $("#jdAccountBind .bindInfo").text("解绑");
                            $("#jdAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                            $.afui.loadContent("#accountBind");
                        }else{
                            hlp.myalert(r.message);
                        }
                    });
                    hlp.myalert("uid:  " +uid  +"accessToken:   "+ accessToken);
                },function(error){
                    hlp.myalert(error);
                });
            }else{
                hlp.log("before accountUnbind call function...");
                svc.flycoUnbindThirdUser(tokenId,loginType,function(r){
                    hlp.log("inside accountUnbind call function...");
                    if(r.status == "SUCCESS"){
                        hlp.log("accountUnbind request success...");
                        $("#jdAccountBind .bindInfo").text("绑定");
                        $("#jdAccountBind .minStatus").removeClass("minStatus").addClass("addStatus");
                    }
                });
                }
        });

        //微信账号绑定
        $("#wxAccountBind").off("tap").on("tap",function(){
            var loginType = "wechat";

            if($("#wxAccountBind .bindInfo").text() == "绑定"){
                hlp.log("before wxLogin function...");
                wxLogin(function(result){
                    hlp.log("inside wxLogin function...");
                    hlp.log(hlp.format("wxLoginResult:{0}",[result]));
                    var uid = result.uid;
                    var accessToken = result.accesstoken;
                    hlp.log("before flycoBindThirdParty call function...");
                    svc.flycoBindThirdParty(uid,loginType,tokenId,function(r){
                        hlp.log("inside flycoBindThirdParty call function...");
                        if(r.status == "SUCCESS"){
                            hlp.log("flycoBindThirdParty request success..");
                            $("#wxAccountBind .bindInfo").text("解绑");
                            $("#wxAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                            $.afui.loadContent("#accountBind");
                        }else{
                            hlp.myalert(r.message);
                        }
                    });

                    hlp.myalert("uid:  " +uid  +"accessToken:   "+ accessToken);
                },function(error){
                    hlp.myalert(error);
                });
            }else{
                hlp.log("before accountUnbind call function...");
                svc.flycoUnbindThirdUser(tokenId,loginType,function(r){
                    hlp.log("inside accountUnbind call function...");
                    if(r.status == "SUCCESS"){
                        hlp.log("accountUnbind request success...");
                        $("#wxAccountBind .bindInfo").text("绑定");
                        $("#wxAccountBind .minStatus").removeClass("minStatus").addClass("addStatus");
                    }
                });
            }
        });

        //QQ账号绑定
        $("#qqAccountBind").off("tap").on("tap",function(){
            var loginType = "qq";

            if($("#qqAccountBind .bindInfo").text() == "绑定"){
                hlp.log("before qqLogin function...");
                qqLogin(function(result){
                    hlp.log("inside qqLogin function...");
                    hlp.log(hlp.format("qqLoginResult:{0}",[result]));
                    var uid = result.uid;
                    var accessToken = result.accesstoken;
                    hlp.log("before flycoBindThirdParty call function...");
                    svc.flycoBindThirdParty(uid,loginType,tokenId,function(r){
                        hlp.log("inside flycoBindThirdParty call function...");
                        if(r.status == "SUCCESS"){
                            hlp.log("flycoBindThirdParty request success...");
                            $("#qqAccountBind .bindInfo").text("解绑");
                            $("#qqAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                            $.afui.loadContent("#accountBind");
                        }else{
                            hlp.myalert(r.message);
                        }
                    });
                    hlp.myalert("uid:  " +uid  +"accessToken:   "+ accessToken);
                },function(error){
                    hlp.myalert(error);
                });
            }else{
                hlp.log("before accountUnbind call function...");
                svc.flycoUnbindThirdUser(tokenId,loginType,function(r){
                    hlp.log("inside accountUnbind call function...");
                    if(r.status == "SUCCESS"){
                        hlp.log("accountUnbind request success...");
                        $("#qqAccountBind .bindInfo").text("绑定");
                        $("#qqAccountBind .minStatus").removeClass("minStatus").addClass("addStatus");
                    }
                });
            }
        });
    });

    //飞科账户授权页面
    $("#flycoAccountAuth").on("panelload",function(e){
        var tokenId = loj.Credential;

        $("#doAuth").off("tap").on("tap",function(){
            var authUserName = $("#authUserName").val();
            var authUserPassWord = $("#authUserPassWord").val();
            hlp.log("before thirdUserBindFlyco call function...");
            svc.thirdUserBindFlyco(tokenId,authUserName,authUserPassWord,function(r){
                hlp.log("inside thirdUserBindFlyco call function...");
                if(r.status == "SUCCESS"){
                    hlp.log("thirdUserBindFlyco request function...");
                    $("#fkAccountBind .bindInfo").text("解绑");
                    $("#fkAccountBind .addStatus").removeClass("addStatus").addClass("minStatus");
                    $.afui.loadContent("#accountBind");
                }else{
                    hlp.myalert(r.message);
                }
            });
        });
    });
});

//设置我的设置开关的默认值
var mySetting = function (settingValue, obj) {
    if (settingValue == 0) {
        obj.removeAttr("checked");
        obj.val(0);
        $("#bindOtherAccount").css("display","none");
    } else {
        obj.attr("checked", "true");
        obj.val(1);
        $("#bindOtherAccount").css("display","block");
    }
};
//修改我的设置开关状态
var setMySetting = function (settingType, obj) {
    //获取当前用户的tokenId
    var settingType = settingType;
    hlp.log(hlp.format("settingType:{0}",[settingType]));
    var tokenId = loj.Credential;
    var settingValue = obj.val();
    var oldSettingValue = obj.val();
    if (settingValue == 0) {
        settingValue = 1;
        obj.val(1);
    } else {
        settingValue = 0;
        obj.val(0);
    }
    svc.updateMySetting(tokenId,settingValue,settingType,function (r) {
        hlp.log("inside updateMySetting call...");
        if (r.status == "FAILURE") {
            hlp.myalert(r.message);
            if (oldSettingValue == 0) {
                obj.removeAttr("checked");
                obj.val(0);
            } else {
                obj.attr("checked", "true");
                obj.val(1);
            }
        }else if(r.status == "SUCCESS" && settingType == "1" && oldSettingValue == "0"){
            loj.setpatternPw("0");
            $.afui.loadContent("#gesturePW");
        }else if(r.status == "SUCCESS" && settingType == "1" && oldSettingValue == "1"){
            loj.setpatternPw("0");
        }else if(r.status == "SUCCESS" && settingType == "2" && oldSettingValue == "0"){
            $("#bindOtherAccount").css("display","block");
        }else if(r.status == "SUCCESS" && settingType == "2" && oldSettingValue == "1"){
            $("#bindOtherAccount").css("display","none");
        }
    });
};

//我的 页面修改头像选项
var changeAvatar = function(){
    $.afui.actionsheet(
        '<a onclick="formCameraFunction()">拍照</a>' +
        '<a onclick="fromAlbumFunction()">从手机相册选择</a>');
};

//从手机相册选择图片
var fromAlbumFunction = function(){
    imageRcodeScanner(function (imgdata) {
        var imageSrc = imgdata;
        $("#showicon").attr("src","data:image/jpg;image/png;base64," + imageSrc);
        hlp.log("before updateUserInfo call...");
        var tokenId = loj.Credential;
        var username = "";
        svc.updateUserInfo(tokenId,username,imageSrc,function(r){
            hlp.log("inside updateUserInfo call...");
            $.afui.loadContent("#myInfo");
        });
    }, function (error) {
        hlp.myalert(error);
    });
};

//拍照选取图片
var formCameraFunction = function(){
    getPictureFromCamera(function (imgdata){
        var imageSrc = imgdata;
        $("#showicon").attr("src","data:image/jpg;image/png;base64," + imageSrc);
        hlp.log("before updateUserInfo call...");
        var tokenId = loj.Credential;
        var username = "";
        svc.updateUserInfo(tokenId,username,imageSrc,function(r){
            hlp.log("inside updateUserInfo call...");
            $.afui.loadContent("#myInfo");
        });
    },function(error){
        hlp.myalert(error);
    });
};

var fgtHandler = 0;

//发送验证码的倒计时
var count = 60;
var SendCodeEnableFg = true;
var forgetPasswordGetNumber = function (mobile) {
    SendCodeEnableFg = false;
    $("#forgetSendCode").text(count + "秒后重发");
    $("#forgetSendCode").addClass("disabled");
    count--;
    if (count > 0) {
        fgtHandler = setTimeout(forgetPasswordGetNumber, 1000);
    } else {
        $("#forgetSendCode").text("发送验证码");
        $("#forgetSendCode").removeClass("disabled");
        SendCodeEnableFg = true;
        svc.deleteCode(mobile,function(r){
            if(r.status == "SUCCESS"){
                hlp.log("deleteCode request success ...");
            }
        });
        count = 60;
    }
};

var clearFgtTm = function(){
	$("#forgetSendCode").text("发送验证码");
    $("#forgetSendCode").removeClass("disabled");
	clearInterval(fgtHandler);
    SendCodeEnableFg = true;
};

var regHandler = 0;

var registerGetNumber = function (mobile) {
    SendCodeEnableFg = false;
    $("#sendCode").text(count + "秒后重发");
    $("#sendCode").addClass("disabled");
    count--;
    if (count > 0) {
        regHandler = setTimeout(registerGetNumber, 1000);
    } else {
        $("#sendCode").text("发送验证码");
        $("#sendCode").removeClass("disabled");
        SendCodeEnableFg = true;
        svc.deleteCode(mobile,function(r){
            if(r.status == "SUCCESS"){
                hlp.log("deleteCode request success ...");
            }
        });
        count = 60;
    }
};

var clearRegTm = function(){
	$("#sendCode").text("发送验证码");
    $("#sendCode").removeClass("disabled");
	clearInterval(regHandler);
    SendCodeEnableFg = true;
};

var refundApplyHandler = 0;

var refundApplyGetNumber = function () {
    SendCodeEnableFg = false;
    $("#refundApplyCode").text(count + "秒后重发");
    $("#refundApplyCode").addClass("disabled");
    count--;
    if (count > 0) {
        refundApplyHandler = setTimeout(refundApplyGetNumber, 1000);
    } else {
        $("#refundApplyCode").text("获取动态验证码");
        $("#refundApplyCode").removeClass("disabled");
        SendCodeEnableFg = true;

        count = 60;
    }
};

var clearRefundApplyTm = function(){
    $("#refundApplyCode").text("获取动态验证码");
    $("#refundApplyCode").removeClass("disabled");
    clearInterval(refundApplyHandler);
    SendCodeEnableFg = true;
};


