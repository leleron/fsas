$(function () {
    //是否是设备控制者的标志
    hlp.panelObj["deviceControlerFlg"] = { "deviceControlerFlg": 0 };
    $.afui.launch();

    //test
    //$("#deviceIndex").on("panelload", function (e) {
    //    hlp.myalert(hlp.panelObj["deviceDtl"].device.deviceId+"<br>"+hlp.panelObj["deviceDtl"].device.userType);
    //});
    // 手动添加
    $("#manuallyAdd").on("panelload", function (e) {
        hlp.log("before call get manuallyAddList");
        //获取当前用户的tokenId
        var tokenId = loj.Credential;
        //获取手动添加设备列表
        svc.getmanuallyAddDeviceData(tokenId, function (r) {
            hlp.log("inside call get manuallyAddList");
            if (r.status == "SUCCESS") {
                hlp.bindtpl(r.result, "#manuallyAddDivs", "tpl_manuallyAdd");
                $("div[id^='pro']").off("tap").on("tap", function () {
                    var this_id = $(this).attr("id");
                    var productCode = this_id.substring(4, this_id.length);
                    var productModel = $(this).attr("productModel");
                    var productName = $(this).attr("productName");
                    hlp.panelObj["productObj"] = {
                        "productCode": productCode,
                        "productModel": productModel,
                        "productName": productName,
                        "macAddress": "",
                        "sn": ""
                    };
                    $.afui.loadContent("#wifiCon");
                });
            } else {
                hlp.myalert(r.message);
            }
        });
    });

    //设备名片
    $("#nameCard").on("panelload", function (e) {
        var tokenId = loj.Credential;
        var cardDeviceId = hlp.panelObj["cardDeviceId"];
        if (!cardDeviceId) {
            return;
        }
        var deviceId = cardDeviceId.deviceId;
        var flg = hlp.panelObj["deviceControlerFlg"];
        if (!flg) {
            return;
        };
        hlp.log("begin device.js get device card");
        svc.getDeviceCard(deviceId, tokenId, function (r) {
            hlp.log("inside device.js get device card");
            if (r.status == "SUCCESS") {
                hlp.log("device.js get device card result" + r.message);
                var deviceCardInfo = r.result;
                var ConcernFlg = deviceCardInfo.isUserConcernDevice;
                var ControlFlg = deviceCardInfo.isUserControlDevice;
                if (ControlFlg == "CONTROLLED") {
                    var userControl=ControlFlg.split(":");
                    var userType=userControl[1];
                }else{
                    var userType="visitor";
                };
                hlp.bindtpl(deviceCardInfo, "#deviceCardInfo", "tpl_deviceCard");
                var device = {"deviceId": deviceId,"userType":userType};
                hlp.panelObj["deviceDtl"] = {"device": device};
                //判断是否在线
                if (deviceCardInfo.onlineStatus == "online") {
                    $("#online").attr("style", "display: block");
                    $("#reWifi").remove();
                } else {
                    $("#offline").attr("style", "display: block");
                }
                //判断设备是否被控制
                if (ControlFlg == "UNCONTROLLED") {
                    //该设备还未被控制
                    if (deviceCardInfo.controlSettingStatus == 1) {
                        //设备设置控制权限开,控制设置设置为是，允许其他人进行控制
                        $("#control").removeClass("disabled");
                    } else {
                        //设备设置控制权限关
                        //$("#deviceCardButtonGroup").remove($("#concern"));
                        $("#control").remove();
                        $("#controlSettingStatus").attr("style", "display: block");
                    }
                } else {
                    $("#control").addClass("disabled");
                    $("#control").text("已控制");
                    $("#concern").remove();
                };
                //判断是否被关注
                if (ConcernFlg == "UNCONCERNED") {
                    //该设备还未被关注
                    $("#concern").removeClass("disabled")
                } else {
                    //该设备已被关注
                    $("#concern").addClass("disabled");
                    $("#concern").text("已关注");
                };
                //判断空气净化器，口气质量级别
                if(deviceCardInfo.airQuality == ""){
                    $("#airQuality").text("暂无数据");
                }else if (deviceCardInfo.airQuality >= 90) {
                    $("#airQuality").text("优");
                } else if (deviceCardInfo.airQuality >= 80) {
                    $("#airQuality").text("良");
                } else {
                    $("#airQuality").text("差");
                };
                //点击设备名片的设备头像
                $("#deviceCardImg").off("tap").on("tap", function () {
                    $("#online").attr("style", "display: none");
                    $("#offline").attr("style", "display: none");
                    var controlBtnClass = $("#control").attr("class");
                    if (controlBtnClass.indexOf("disabled") > 0) {
                        //用户身份为主控或副控时
                        flg.deviceControlerFlg = 1;
                    } else{
                        //用户身份为游客或粉丝时
                        flg.deviceControlerFlg = 0;
                    };
                    $.afui.loadContent("#deviceIndex");
                });
                //设备名片控制
                $("#control").off("tap").on("tap", function () {
                    var btnClass = $("#control").attr("class")
                    if (btnClass.indexOf("disabled") > 0) {
                        return;
                    };
                    if (ConcernFlg == "CONCERNED") {
                        hlp.log("begin device.js device card delete followed device ");
                        svc.deleteDeviceFollow(deviceId, tokenId, function (r) {
                            hlp.log("inside device.js device card delete followed device ");
                            if (r.status == "SUCCESS") {
                                cardDeviceAdd(tokenId, deviceId,flg);
                            }else{
                                hlp.myalert(r.message);
                            };
                        });
                    }else{
                        cardDeviceAdd(tokenId, deviceId,flg);
                    }
                });
                //设备名片关注
                $("#concern").off("tap").on("tap", function () {
                    var btnClass = $("#concern").attr("class")
                    if (btnClass.indexOf("disabled") > 0) {
                        return;
                    }
                    hlp.log("begin device.js deviceCard Concern device ");
                    svc.deviceCardConcern(tokenId, deviceId, function (r) {
                        hlp.log("inside device.js deviceCard Concern device");
                        if (r.status == "SUCCESS") {
                            $("#online").attr("style", "display: none");
                            $("#offline").attr("style", "display: none");
                            hlp.panelObj["deviceDtl"].device.userType="visitor";
                            //用户身份为游客或粉丝时
                            flg.deviceControlerFlg = 0;
                            showToast("关注成功！");
                            $.afui.loadContent("#deviceIndex");
                        } else {
                            hlp.myalert("device.js device.js deviceCard Concern device result:" + r.message);
                        }
                    });
                });
                //设备名片wifi重置
                $("#reWifi").off("tap").on("tap", function () {
                    var proObj = hlp.panelObj["productObj"];
                    if(!proObj){
                        return;
                    };
                    svc.getProductInfo(tokenId, proObj.productCode, function (pr) {
                        if (pr.status == "SUCCESS") {
                            hlp.log("getProductInfo result" + pr.message);
                            proObj.productName=pr.product.productName;
                            proObj.sn="";
                        } else {
                            hlp.log("getProductInfo result" + pr.message);
                        }
                    });
                    $.afui.loadContent("#wifiCon");
                });

            } else {
                hlp.log("device.js get device card result" + r.message);
            }
        });
    });
    $("#nameCard").on("panelunload", function (e) {
        $("#online").attr("style", "display: none");
        $("#offline").attr("style", "display: none");
    });

    // 我的设备列表
    $("#deviceList").on("panelload", function (e) {
        console.log("devicelist panelload:::::::::::::::");
        var tokenId = loj.Credential;
        //基础的的callback
        var barCheckBaseCallback=function(r){
            hlp.myalert("message>>" + r.message);
            hlp.log("checkBarcode if bind result" + r.message);
        };
        //二维码未被使用的callback
        var barCheckSuccessCallback=function(r,tokenId, proObj){
            barCheckBaseCallback(r);
            svc.getProductInfo(tokenId, proObj.productCode, function (pr) {
                if (pr.status == "SUCCESS") {
                    hlp.log("getProductInfo result" + pr.message);
                    proObj.productName=pr.product.productName;
                } else {
                    hlp.log("getProductInfo result" + pr.message);
                }
            });
            $.afui.loadContent("#wifiCon");
        };
        //二维码已存在的callback
        var barCheckExistCallback=function(r){
            barCheckBaseCallback(r);
            if (r.shareSwitch == 1) {
                hlp.panelObj["cardDeviceId"] = {
                    "deviceId": r.deviceId
                }
                $.afui.loadContent("#nameCard");
            } else {
                hlp.myalert("该设备设置隐私保护，无法察看名片信息");
            }
        };
        //点击扫一扫
        $("#scanQRcodeLink").off("tap").on("tap", function (event) {
            qRcodeScanner(function (result) {
                    var barcode = result.text;
                    //var barcode="001500code30000003";
                    var barcodeLength = barcode.length;
                    if (barcodeLength != 18) {
                        hlp.myalert("无效设备，请重新扫描飞科智能产品二维码!");
                    } else {
                        var productCode = barcode.substring(6, 10);
                        var productModel = barcode.substring(10, 11);
                        var sn = barcode;
                        hlp.panelObj["productObj"] = {
                            "productCode": productCode,
                            "productModel": productModel,
                            "productName": "",
                            "macAddress": "",
                            "sn": sn
                        };
                        var proObj = hlp.panelObj["productObj"];
                        hlp.myalert("sn>>" + sn);
                        checkBarcode(tokenId, sn, proObj,barCheckSuccessCallback,barCheckExistCallback,barCheckBaseCallback );
                    }
                },
                function (error) {
                    hlp.myalert("Scanning failed: " + error);
                });
        });
        DeviceListInit();
    });
    $("#deviceList").on("panelunload", function (e) {
        $(".popupDevice").hide();
    });

    //我关注的设备页面
    $("#followDeviceList").on("panelload", function (e) {

        $.afui.setBackButtonVisibility(false);
        hlp.log("before call get Famiallydevicelist");
        //获取关注的设备
        getFollowDeviceList();
        //我的设备页面绑定滑动事件
        $("#followDeviceList").off("swipe").bind("swipe", function () {
            hlp.log("inside followDeviceList swipe function...");
            $.afui.loadContent("#deviceList");
        });
    });
    $("#followDeviceList").on("panelunload", function (e) {
        $.afui.setBackButtonVisibility(true);
    });

    // 设备控制主页
    $("#deviceIndex").on("panelload", function (e) {
        $(".menuButton").show();
    });
    $("#deviceIndex").on("panelunload", function (e) {
        $(".menuButton").hide();
        $(".popupMyDevice").hide();
        $(".popupMyFollowedDevice").hide();
    });

    //wifi配置
    $("#wifiCon").on("panelload", function (e) {
        $("#wifiPassword").val("");
        var deviceWifiReset = hlp.panelObj["deviceWifiReset"];
        //获取当前用户的tokenId
        var tokenId = loj.Credential;

        //wifiCon初期化时获取SSID
        try {
            getssid(function (data) {
                var ssid = data.lan.SSID;
                if (ssid.indexOf("unknown") > 0) {
                    hlp.bindtpl("检测您没有连接WIFI，将无法绑定！", "#wifiSSIDDiv", "tpl_wifi");
                    jQuery('#wifissid').val("");
                } else {
                    hlp.bindtpl(data.lan.SSID, "#wifiSSIDDiv", "tpl_wifi");
                    jQuery('#wifissid').val(data.lan.SSID);
                }
            }, function (error) {
                hlp.log("getssid error:" + error);
            });
        } catch (e) {
            hlp.bindtpl("手机插件加载失败", "#wifiSSIDDiv", "tpl_wifi");
            jQuery('#wifissid').val("");
        }

        //window.setInterval(function () {
        //}, 1000);
        //var ssid_new="ssid123"
        //hlp.bindtpl(ssid_new, "#wifiSSIDDiv", "tpl_wifi");
        //jQuery('#wifissid').val(ssid_new);
        //配置WIFI界面，点击确认按钮事件
        $("#wifiSure").off("tap").on("tap", function () {
            $.afui.blockUI(0.5);
            $("#waiting").show();
            var ssid = jQuery('#wifissid').val();
            var password = jQuery('#wifiPassword').val();
            var pt = hlp.panelObj["productObj"];
            if (ssid.length == 0) {
                hlp.myalert("检测您没有连接WIFI，将无法绑定！");
                setTimeout(finishedCallback, 1000);
                return;
            }

            var finishedCallback = function () {
                $.afui.unblockUI();
                $("#waiting").hide();
            };

            //wifi配置成功获取到mac地址的回调函数
            var setWifiCallback = function (result) {
                //macCheck通过的回调函数
                var setMacCheckCallback = function () {
                    $.afui.loadContent("#nameGroup");
                };
                //获取到的mac地址
                pt.macAddress = result.mac;
                //check mac
                getMacCheck(tokenId, result.mac, setMacCheckCallback,
                    function (r) {
                        // otherBound
                        var pt = hlp.panelObj["productObj"];
                        if (!pt) {
                            return;
                        } else {
                            var sn = pt.sn;
                            if (sn == "") {
                                setMacCheckCallback();
                            } else {
                                hlp.myalert(r.message);
                            }
                        }
                    },
                    function (r) {
                        // self bond
                        hlp.myalert(r.message);
                    },
                    function (r) {
                        //faile
                        hlp.myalert(r.message);
                    });
                setTimeout(finishedCallback, 1000);
            };

            // 判断重置 OR 配置
            if (deviceWifiReset && deviceWifiReset.isReset == true) {
                hlp.log("wifi重置");

                var checkMacSucceed = function (result) {
                    svc.updateInfoForWifiReset(deviceWifiReset.device.deviceId, tokenId, result.mac, position.coords.latitude, position.coords.longitude,
                        function (e) {
                            hlp.myalert("重置wifi成功");
                            finishedCallback();
                        });
                };

                // wifi重置
                getProModSync(deviceWifiReset.device.productModel, tokenId, ssid, password,
                    function (result) {
                        // Succeed Callback.
                        if (result) {
                            getPst(function onSuccess(position) {
                                hlp.log("getTude succeed. la:" + position.coords.latitude + " lo:" + position.coords.longitude);
                                getMacCheck(tokenId, result.mac,
                                    function (r) {
                                        svc.updateInfoForWifiReset(deviceWifiReset.device.deviceId, tokenId, result.mac, position.coords.latitude, position.coords.longitude,
                                            function (e) {
                                                hlp.myalert("重置wifi成功");
                                                finishedCallback();
                                            });
                                    }, function (e) {
                                        hlp.myalert("重置wifi失败");
                                        finishedCallback();
                                    }, function (r) {
                                        svc.updateInfoForWifiReset(deviceWifiReset.device.deviceId, tokenId, result.mac, position.coords.latitude, position.coords.longitude,
                                            function (e) {
                                                hlp.myalert("重置wifi成功");
                                                finishedCallback();
                                            });
                                    }, function (r) {
                                        hlp.myalert("重置wifi失败");
                                        finishedCallback();
                                    });
                            });
                        } else {
                            finishedCallback();
                        }
                    }, finishedCallback);
                hlp.log("WifiReset normal ended, Unlock UI. :" + e.toString());

            } else {
                hlp.log("wifi配置");
                // wifi配置
                if (pt) {
                    getProModSync(pt.productModel, tokenId, ssid, password, setWifiCallback, finishedCallback);
                } else {
                    finishedCallback();
                }
            }
        });
    });

    $("#wifiCon").on("panelunload", function (e) {
        hlp.panelObj["deviceWifiReset"] = {
            "isReset": false
        };
    });

    //设置昵称和分组
    $("#nameGroup").on("panelload", function (e) {
        var proName = "";
        var pt = hlp.panelObj["productObj"];
        if (pt) {
            //初期化昵称和分组
            hlp.bindtpl(pt, "#NameGroupDiv", "tpl_nameGroup");

        };
        $("#nameGroupSure").off("tap").on("tap", function () {
            var nickname = $('#proName').val();
            var group = $('#proGroup').attr("placeholder");
            var tokenId = loj.Credential;
            var proCode = "";
            var macAddress = "";
            var sn = "";
            var pt = hlp.panelObj["productObj"];
            if (pt) {
                proCode = pt.productCode;
                macAddress = pt.macAddress;
                sn = pt.sn;
            }
            getTude(function (la, lo) {
                hlp.myalert("latitude>>>" + la + ",,,longitude>>>" + lo);
                //var la = "31.3105555555";
                //var lo = "121.50416666667";
                if (sn == "") {
                    //手动绑定
                    sn = macAddress;
                    addDevice(tokenId, nickname, group, la, lo, sn, macAddress, proCode);
                } else {
                    //Check二维码是否已存在
                    svc.getCheckIfBinded(tokenId, sn, proCode, function (r) {
                        if (r.status == "SUCCESS") {
                            svc.getMacIfBindedFlg(tokenId, macAddress, function (r) {
                                if (r.status == "SUCCESS") {
                                    addDevice(tokenId, nickname, group, la, lo, sn, macAddress, proCode);
                                } else {
                                    hlp.myalert(r.message);
                                }
                            });
                        } else {
                            hlp.myalert(r.message);
                        };
                    });
                }
            });
        })
    });

    //设备权限
    $("#deviceAuthority").on("panelload", function (e) {
        var deviceId = "";
        var tokenId = loj.Credential;
        var pt = hlp.panelObj["deviceDtl"];
        if (pt) {
            deviceId = pt.device.deviceId;
            svc.getDeviceAuthority(deviceId, tokenId, function (r) {
                if (r.status == "SUCCESS") {
                    var primaryOwner = "";
                    var secondaryOwner = [];
                    var allOwner = "";
                    hlp.log("get deviceAuthority list result" + r.message);
                    var ownerList = r.deviceOwners;
                    for (var i = 0; i < ownerList.length; i++) {
                        if (ownerList[i].userType == "primary") {
                            primaryOwner = ownerList[i];
                        } else if (ownerList[i].userType == "secondary") {
                            secondaryOwner.push(ownerList[i]);
                        }
                    }
                    ;
                    allOwner = { "primaryOwner": primaryOwner, "secondaryOwnerList": secondaryOwner };
                    hlp.bindtpl(allOwner, "#Owner", "tpl_deviceAuthority");
                    $("li[id^='assOwner']").off("longTap").on("longTap", function () {
                        if (pt.device.userType == "primary") {
                            var li_userId = $(this).attr("id");
                            var userId = li_userId.substring(8, li_userId.length);
                            var ownerName = $(this).attr("userName");
                            var deleteFlg = confirm("是否确认要解除该设备主人" + ownerName + "的控制权限？");
                            if (deleteFlg) {
                                svc.deleteSecondary(deviceId, tokenId, userId, function (r) {
                                    if (r.status == "SUCCESS") {
                                        hlp.log("deleteSecondary result" + r.message);
                                        $("#" + li_userId).remove();
                                    } else {
                                        hlp.log("deleteSecondary result" + r.message);
                                    }
                                })
                            }
                        } else {
                            return;
                        }
                    });
                } else {
                    hlp.log("get deviceAuthority list result" + r.message);
                }
            });
        }
    });

    //设备粉丝
    $("#deviceFans").on("panelload", function (e) {
        hlp.log("before call get device fans list");
        //获取当前用户的tokenId
        var pt = hlp.panelObj["deviceDtl"];
        if (!pt) {
            return;
        }
        //获取当前用户的tokenId
        var deviceId = pt.device.deviceId.toString();
        var tokenId = loj.Credential;
        //获取手动添加粉丝列表
        svc.getDeviceFans(deviceId, tokenId, function (r) {
            if (r.status == "SUCCESS") {
                hlp.log("get device fans list result " + r.message);
                hlp.bindtpl(r, "#deviceFansList", "tpl_deviceFansListAdd");
            } else {
                hlp.log("get device fans list error result" + r.message);
            }
        });
    });

    //设备日志
    $("#deviceLog").on("panelload", function (e) {
        $(".searchButton").show();
        var pt = hlp.panelObj["deviceDtl"];
        var deviceId = "";
        if (pt) {
            deviceId = pt.device.deviceId;
        }
        var tokenId = loj.Credential;
        var date = "";
        var handlerId = "";
        var source = "";
        //操作用户列表
        var ownerList = "";
        //操作时间
        var logTime = getNowDate();

        svc.getDeviceAuthority(deviceId, tokenId, function (r) {
            if (r.status == "SUCCESS") {
                hlp.log("get deviceAuthority list result" + r.message);
                ownerList = r.deviceOwners;
                var deviceLogData = { "logList": "", "handlerList": ownerList, "logTime": logTime };
                getLogList(deviceId, date, tokenId, handlerId, source, deviceLogData);
            } else {
                hlp.log("get deviceAuthority list result" + r.message);
            }
        });
    });
    $("#deviceLog").on("panelunload", function (e) {
        $(".searchButton").hide();
        $("#filterForm").hide();
    });
    // 设备故障列表
    $("#deviceErrorList").on("panelload", function (e) {
        hlp.log("before call get device error list");
        var pt = hlp.panelObj["deviceDtl"];
        if (!pt) {
            return;
        }
        //获取当前用户的tokenId
        var deviceId = pt.device.deviceId.toString();
        var tokenId = loj.Credential;
        //获取手动添加设备列表
        svc.getDeviceErrorList(deviceId, tokenId, function (r) {
            hlp.log("inside call get device error list");
            if (r.status == "SUCCESS") {
                hlp.bindtpl(r, "#deviceErrorInfo", "tpl_deviceErrorListAdd");
                var li = $("#deviceErrorInfo li");
                $.each(li, function (i) {
                    var status = li.eq(i).find(".deviceMsgStatus").val();
                    if (status == "Y") {
                        li.eq(i).css("color", "gray");
                    } else {
                        li.eq(i).css("color", "black");
                    }
                });
                // delete button
                $("li .archive").off("tap").on("tap", function () {
                    var myDevice = $($(this)[0].parentElement);
                    var deviceMsgId = $(myDevice[0].parentElement).find(".deviceMsgId").val();
                    var pt = hlp.panelObj["deviceDtl"];
                    var userType = pt.device.userType.toString();
                    if (userType != "primary") {
                        hlp.myalert("您没有权限删除!");
                        return;
                    }
                    svc.deleteDeviceErrorInfo(deviceMsgId, tokenId, function (r) {
                        if (r.status == "SUCCESS") {
                            myDevice.closest('.swipe-reveal').remove();
                            hlp.myalert("删除成功!");
                        } else {
                            hlp.myalert(r.message);
                        }
                    });
                });
                $("li .swipe-content").off("tap").on("tap", function () {
                    var myDevice = $($(this)[0].parentElement);
                    var deviceMsgId = myDevice.find(".deviceMsgId").val();
                    var deviceMsgContent = myDevice.find(".deviceMsgContent").val();
                    var deviceMsgStatus = myDevice.find(".deviceMsgStatus").val();
                    var deviceMsgTime = myDevice.find(".deviceMsgTime").val();
                    var deviceMsgDetailTime = myDevice.find(".deviceMsgDetailTime").val();
                    var deviceMsgTitle = myDevice.find(".deviceMsgTitle").val();
                    hlp.panelObj["deviceErrorListObj"] = {
                        "deviceMsgId": deviceMsgId,
                        "deviceMsgContent": deviceMsgContent,
                        "deviceMsgStatus": deviceMsgStatus,
                        "deviceMsgTime": deviceMsgTime,
                        "deviceMsgDetailTime": deviceMsgDetailTime,
                        "deviceMsgTitle": deviceMsgTitle,
                        "phoneNumber": ""
                    };
                    svc.updateDeviceErrorInfo(deviceMsgId, tokenId, function (r) {
                        if (r.status == "SUCCESS") {
                            myDevice.css("color", "gray");
                            $.afui.loadContent("#deviceErrorDetail");
                        } else {
                            hlp.myalert(r.message);
                        }
                    });
                });
            } else {
                hlp.myalert(r.message);
            }
        });
    });

    // 设备故障详情
    $("#deviceErrorDetail").on("panelload", function (e) {
        var pt = hlp.panelObj["deviceErrorListObj"];
        if (pt) {
            svc.getPhoneNumber(function (r) {
                hlp.log("inside call get phone number");
                if (r.status == "SUCCESS") {
                    pt.phoneNumber = r.result.CustomerServicePhone;
                    //初期化昵称和分组
                    hlp.bindtpl(pt, "#deviceErrorDetailInfo", "tpl_deviceErrorDetailAdd");
                    $(".online-advisory").on("tap", function () {
                        $.afui.loadContent("#chatHelp");
                    });
                    $(".spots-nearby").on("tap", function () {
                        $.afui.loadContent("#spotsNearby");
                    });
                } else {
                    hlp.myalert(r.message);
                }
            });
        }
    });

    //设备设置
    $("#deviceSetting").on("panelload", function (e) {
        hlp.log("before call device setting");
        //获取当前用户的tokenId
        var pt = hlp.panelObj["deviceDtl"];
        if (!pt) {
            return;
        }
        //获取当前用户的tokenId
        var deviceId = pt.device.deviceId.toString();
        var tokenId = loj.Credential;
        var userType = pt.device.userType.toString();
        if (userType != "primary") {
            $("#deviceSetting input").attr("disabled", true);
            hlp.myalert("您没有权限设置!");
        } else {
            $("#deviceSetting input").attr("disabled", false);
        }
        svc.getDeviceSetting(deviceId, tokenId, function (r) {
            if (r.status == "SUCCESS") {
                var result = r.result;
                $.each(result, function (i) {
                    var settingType = Number(result[i].settingType);
                    var settingStatus = Number(result[i].settingStatus);
                    switch (settingType) {
                        case 1: // 定时开关
                            getDeviceSetting(settingStatus, $("#timingSwitch"));
                            break;
                        case 2: // 控制设置
                            getDeviceSetting(settingStatus, $("#controlSwitch"));
                            break;
                        case 3: // 分享设置
                            getDeviceSetting(settingStatus, $("#shareSwitch"));
                            break;
                        default:
                            break;
                    }
                });
            } else {
                hlp.myalert(r.message);
            }
        });
        $(".switchTiming #timingSwitch").off("click").on("click", function (event) {
            setDeviceSetting(1, $("#timingSwitch"));
        });
        $(".switchTiming #controlSwitch").off("click").on("click", function () {
            setDeviceSetting(2, $("#controlSwitch"));
        });
        $(".switchTiming #shareSwitch").off("click").on("click", function () {
            setDeviceSetting(3, $("#shareSwitch"));
        });
        $(".switchTiming").off("tap").on("tap", function (e) {
            var pt = hlp.panelObj["deviceDtl"];
            if (!pt) {
                return;
            }
            var userType = pt.device.userType.toString();
            if (userType != "primary") {
                hlp.myalert("您没有权限设置!");
                return;
            }
            var attr = $(e.target).attr("st");
            if (attr != "ts") {
                var settingStatus = $("#timingSwitch").val();
                if (settingStatus == 1) {
                    $.afui.loadContent("#timing");
                }
            }
        });
    });
    //定时开关
    $("#timing").on("panelload", function (e) {
        hlp.log("before call timing setting");
        //获取当前用户的tokenId
        var pt = hlp.panelObj["deviceDtl"];
        if (!pt) {
            return;
        }
        //获取当前用户的tokenId
        var deviceId = pt.device.deviceId.toString();
        var tokenId = loj.Credential;
        svc.getTiming(deviceId, tokenId, function (r) {
            if (r.status == "SUCCESS") {
                $("#timing1").val(r.deviceTimer.powerOnTime.toString());
                $("#timing2").val(r.deviceTimer.powerOffTime.toString());
                $(".timingSave .button").off("tap").on("tap", function () {
                    var timing1 = $("#timing1").val();
                    var timing2 = $("#timing2").val();
                    svc.setTiming(deviceId, tokenId, timing1, timing2, function (r) {
                        $("#timing1").val(timing1);
                        $("#timing2").val(timing2);
                        if (r.status == "SUCCESS") {
                            hlp.myalert("保存成功!");
                        } else {
                            hlp.myalert(r.message);
                        }
                    });
                });
            } else {
                hlp.myalert(r.message);
            }
        });
    });
    //昵称查找按钮
    $("#deviceSearch").on("panelload", function () {
        $("#search").on("tap", function () {
            var InputNickName = document.getElementById("searchInput").value;
            loj.setInputNickName(InputNickName);
            $.afui.loadContent("#deviceSearchResult");

        });
    });
    //昵称设备显示
    $("#deviceSearchResult").on("panelload", function () {
        var nickname = loj.InputNickName;
        var tokenId = loj.Credential;
        svc.getnickdevicelist(nickname, tokenId, function (r) {
            hlp.log("inside call get Nickdevice list.");
            if (r.status == "SUCCESS") {
                hlp.bindtpl(r.deviceList, "#device1", "tpl_nickdevice");
                $("li.nickdev-info").off("tap").on("tap", function () {
                    var deviceId = $(this).find(".deviceId").val();
                    hlp.panelObj["cardDeviceId"] = {
                        "deviceId": deviceId
                    };
                    $.afui.loadContent("#nameCard");
                });
            } else {
                hlp.bindtpl("", "#device1", "tpl_nickdevice");
                hlp.log(r.message);
            }
        });

    });
    //关注度设备排名
    $("#attentionRank").on("panelload", function () {
        var tokenId = loj.Credential;
        svc.getattentdevicelist(tokenId, function (r) {
            hlp.log("inside call get attentiondevice list.");
            if (r.status == "SUCCESS") {
                hlp.bindtpl(r.result, "#attentdevic", "tpl_attentdevice");
                $("li.attentionrank-info").off("tap").on("tap", function () {
                    var deviceId = $(this).find(".deviceId").val();
                    hlp.panelObj["cardDeviceId"] = {
                        "deviceId": deviceId
                    };
                    $.afui.loadContent("#nameCard");
                });
            } else {
                hlp.bindtpl("", "#attentdevic", "tpl_attentdevice");
                hlp.log(r.message);
            }
        });

    });
    //附近设备查询
    $("#deviceNearby").on("panelload", function () {
        var tokenId = loj.Credential;
        getTude(function (la, lo) {
            //var la = "31.3105555555";
            //var lo = "121.50416666667";
            //alert("latitude>>>"+la+",,,longitude>>>"+lo);
            svc.nearbydevice(tokenId, la, lo, function (r) {
                hlp.myalert("inside nearby device list");
                if (r.status == "SUCCESS") {
                    hlp.bindtpl(r.result, "#nearbydevic", "tpl_nearbydevice");
                    $("li.nearbydevice-info").off("tap").on("tap", function () {
                        var deviceId = $(this).find(".deviceId").val();
                        hlp.panelObj["cardDeviceId"] = {
                            "deviceId": deviceId
                        };
                        $.afui.loadContent("#nameCard");
                    });
                } else {
                    hlp.bindtpl("", "#nearbydevic", "tpl_nearbydevice");
                    hlp.myalert(r.message);
                }
            });
        });

    });
    //关于设备
    $("#aboutDevice").on("panelload", function (e) {
        var deviceDtl = hlp.panelObj["deviceDtl"];
        var tokenId = loj.Credential;
        var deviceId = "";
        var deviceImg = "";
        if (!deviceDtl) {
            return;
        } else {
            deviceId = deviceDtl.device.deviceId;
        };
        svc.getDeviceDtl(deviceId, tokenId, function (r) {
            if (r.status == "SUCCESS") {
                var device = r.DeviceInfo;
                if (device.image == "") {
                    deviceImg = "./images/myDeviceDtl/" + device.productCode + "demo.png";
                } else {
                    deviceImg = device.image;
                }
                hlp.bindtpl(device, "#deviceDtl", "tpl_aboutDevice");
                var deviceEdit = { "deviceName": device.deviceName, "deviceImg": deviceImg };
                hlp.bindtpl(deviceEdit, "#deviceEditName_Div", "tpl_deviceEditName");
                //hlp.bindtpl(deviceEdit, "#deviceEditImg_Div", "tpl_deviceEditImg");
                $('#barCode').qrcode({
                    width: "50",
                    height: "50",
                    text: toUtf8(device.barCode)
                });

                var canvas = $('#barCode canvas')[0];
                var dataURL = canvas.toDataURL();
                //alert(dataURL);
                //Canvas2Image.saveAsPNG(canvas);
                hlp.panelObj["barcodeDataURL"] = { "dataURL": dataURL };
                //check当前版本是否需要更新
                svc.getFirmwareUpdateFlg(device.deviceId, tokenId, function (r) {
                    if (r.status == "SUCCESS") {
                        hlp.log("device.js FirmwareUpdateFlg result" + r.message);
                        $("#deviceVersionFlag").text("下载新版本");
                        var firmwareId = r.firmwareId;
                        $("#deviceVersionFlag").off("tap").on("tap", function () {
                            $.afui.blockUI(0.5);
                            $("#waiting").show();
                            svc.updateFirmware(tokenId, firmwareId, function (r) {
                                if (r.status == "SUCCESS") {
                                    //固件升级成功！
                                    hlp.myalert(r.message);
                                    $("#deviceVersionFlag").text("");
                                    setTimeout(function () {
                                        $.afui.unblockUI();
                                        $("#waiting").hide();
                                    }, 1000);
                                } else {
                                    hlp.myalert("device.js updateFirmware result" + r.message);
                                    setTimeout(function () {
                                        $.afui.unblockUI();
                                        $("#waiting").hide();
                                    }, 1000);
                                };
                            });
                        });
                    } else {
                        hlp.log("device.js FirmwareUpdateFlg result" + r.message);
                    }
                });

                //点击设备昵称进入昵称修改界面
                $("#toEditDeviceName").off("tap").on("tap", function () {
                    if (device.userType == "primary") {
                        $.afui.loadContent("#editDeviceName");
                    }
                });
                //修改设备昵称
                $("#aboutDeviceUpdate").off("tap").on("tap", function () {
                    var deviceEditName = $("#deviceEditName").val();
                    if (deviceEditName == "") {
                        deviceEditName = $("#deviceEditName").attr("placeholder");
                    }
                    //var deviceEditImg=$("#showMyImg").attr("src");
                    updateDeviceInfo(device.deviceId, tokenId, deviceEditName, "");
                    $("#deviceNike").text(deviceEditName);
                    device.deviceName = deviceEditName;
                });
                //修改设备头像时点击图片
                $("#deviceDtlImg").off("tap").on("tap", function () {
                    if (device.userType == "primary") {
                        imageRcodeScanner(function (imgdata) {
                            hlp.log("inside device.js getPicture function...");
                            var imageSrc = imgdata;
                            updateDeviceInfo(device.deviceId, tokenId, "", imageSrc);
                            $("#dtlP").attr("src", "data:image/jpg;image/png;base64," + imageSrc);
                            device.image = "data:image/jpg;image/png;base64," + imageSrc;
                        }, function (error) {
                            hlp.myalert(error);
                        });
                    }
                });
                //弹出二维码action sheet
                $("#barCode").off("tap").on("tap", function () {
                    $.afui.actionsheet(
                        '<a onclick="saveBarcodePicture()" >保存二维码图片</a>' +
                        '<a  onclick="shareBarcode()">分享二维码</a>');
                });
            } else {
                hlp.myalert(r.message);
            };
        });
    });

});

var DeviceListInit = function () {

    var tokenId = loj.Credential;

    // 获取设备列表
    if (loj.IsLogin == true) {
        hlp.log("login..");
        getDeviceList();
    }
    else {
        hlp.log("not login..");
        hlp.bindtpl("", "#myDeviceDiv", "tpl_main");
    }

    //我的设备页面绑定滑动事件
    $("#deviceList").off("swipe").bind("swipe", function () {
        $.afui.loadContent("#followDeviceList");
    });
};

//MacCheck
var getMacCheck = function (tokenId, macAddress, succeedHandler, otherBoundHandler, boundHandler, failedHandler) {
    //获取配置WIFI时，Mac地址有无得校验
    svc.getMacIfBindedFlg(tokenId, macAddress, function (r) {
        if (r.status == "SUCCESS") {
            //mac地址未使用
            hlp.log("setting wifi result" + r.message);
            if (succeedHandler) {
                succeedHandler();
            }
        } else if (r.status == "OTHERBOUND") {
            //mac地址被他人使用
            hlp.log("setting wifi result" + r.message);
            if (otherBoundHandler) {
                otherBoundHandler(r);
            }
        } else if (r.status == "BOUND") {
            //mac地址已被自己使用
            hlp.log("setting wifi result" + r.message);
            if (boundHandler) {
                boundHandler(r);
            }
        } else {
            if (failedHandler) {
                failedHandler(r);
            }
        }
    });
};

//Check二维码是否已存在
var checkBarcode = function (tokenId, sn, proObj,succeedHandler,existHandler, baseHandler) {
    svc.getCheckIfBinded(tokenId, sn, proObj.productCode, function (r) {
        if (r.status == "SUCCESS") {
            if(succeedHandler){
                succeedHandler(r,tokenId, proObj);
            };
        } else if (r.status == "EXIST") {
            if(existHandler){
                existHandler(r);
            };
        } else {
            if(baseHandler){
                baseHandler(r);
            };
        };
    });
};


//添加设备
var addDevice = function (tokenId, nickname, group, la, lo, sn, macAddress, proCode) {
    svc.deviceAdd(tokenId, nickname, group, la, lo, sn, macAddress, proCode, function (r) {
        if (r.status == "SUCCESS") {
            hlp.log("setting group name result" + r.message);
            showToast(r.message);
            var flg = hlp.panelObj["deviceControlerFlg"];
            if (!flg) {
                return;
            } else {
                flg.deviceControlerFlg = 1;
            };
            var device = { "deviceId": r.deviceId, "userType": r.userType };
            hlp.panelObj["deviceDtl"] = { "device": device };
            $.afui.loadContent("#deviceIndex");
        } else {
            hlp.myalert(r.message);
        }
    });
};

//设备名片添加控制
var cardDeviceAdd=function(tokenId, deviceId,flg){
    hlp.log("begin device.js deviceCard control device ");
    svc.deviceCardControl(tokenId, deviceId, function (r) {
        hlp.log("inside device.js deviceCard control device");
        if (r.status == "SUCCESS") {
            $("#online").attr("style", "display: none");
            $("#offline").attr("style", "display: none");
            hlp.panelObj["deviceDtl"].device.userType="secondary";
            //用户身份为副控时
            flg.deviceControlerFlg = 1;
            showToast("控制成功！");
            $.afui.loadContent("#deviceIndex");
        } else {
            hlp.myalert("device.js device.js deviceCard control device result:" + r.message);
        }
    });
};

//根据模板厂商，选择不同的获取mac地址的方式
var getProModSync = function (productModel, tokenId, ssid, password, succeedHandler, failedHandler) {
    productModel="3";
    hlp.log("productModel = " + productModel);
    if (productModel == "2") {
        sConnect(ssid, password, function (result) {
                hlp.log("result.mac::::" + result.mac);
                if (result.mac == undefined) {
                    hlp.myalert("设备连接失败！");
                    if (failedHandler) {
                        failedHandler();
                    }
                } else {
                    if (succeedHandler) {
                        succeedHandler(result);
                    }
                }
                return result;
            }, function (error) {
                hlp.log(error);
                if (failedHandler) {
                    failedHandler();
                }
                return null;
            }
        );
    } else if (productModel == "1") {
        rConnect(ssid, password, function (result) {
            hlp.log("result.mac::::" + result.mac);
            if (result.mac == undefined) {
                hlp.myalert("设备连接失败！");
                if (failedHandler) {
                    failedHandler();
                }
            } else {
                if (succeedHandler) {
                    succeedHandler(result);
                }
            }
            return result;
        }, function (error) {
            hlp.log(error);
            if (failedHandler) {
                failedHandler();
            }
            return null;
        });
    } else if (productModel == "3") {
        //var result= {"mac": "18fe349ab163"};
        //if (succeedHandler) {
        //    succeedHandler(result);
        //}
        //return result;
        eConnect(ssid, password, function (result) {
            hlp.log("result.mac::::" + result.mac);
            if (result.mac == undefined) {
                hlp.myalert("设备连接失败！");
                if (failedHandler) {
                    failedHandler();
                }
            } else {
                if (succeedHandler) {
                    succeedHandler(result);
                }
            }
            return result;
        }, function (error) {
            hlp.log(error);
            if (failedHandler) {
                failedHandler();
            }
            return null;
        });
    }
};


//获取当前时间
var getNowDate = function () {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var logTime = { "year": year, "month": month, "day": day };
    return logTime;
};
//获取log
var getLogList = function (deviceId, date, tokenId, handlerId, source, deviceLogData) {
    svc.deviceLog(deviceId, date, tokenId, handlerId, source, function (r) {
        if (r.status == "SUCCESS") {
            hlp.log("get deviceLog result" + r.message);
            deviceLogData.logList = r.deviceLogList;
            hlp.bindtpl(deviceLogData, "#deviceLog_div", "tpl_deviceLog");

        } else if (r.status == "EMPTY") {
            hlp.log("get deviceLog result" + r.message);
            deviceLogData.logList = "";
            hlp.bindtpl(deviceLogData, "#deviceLog_div", "tpl_deviceLog");
        }
        $("#searchLog").off("tap").on("tap", function () {
            var handlerId = $("#controller").val();
            var source = $("#controlSource").val();
            var year = $("#yearId").val();
            var month = $("#monthId").val();
            var day = $("#dayId").val();
            var date = new Date(year, month, day);
            //var date=new Date(2015,6,11);
            if (date.getFullYear() == year & date.getMonth() == month & date.getDate() == day) {
                if (month < 10) {
                    month = "0" + month;
                };
                if (day < 10) {
                    day = "0" + day;
                }
                var searchDate = year + "" + month + "" + day;
                hlp.log(hlp.format("deviceId:{0},date:{1},tokenId:{2},handlerId:{3},source:{4},deviceLogData:{5}", [deviceId, date, tokenId, handlerId, source, deviceLogData]));
                getLogList(deviceId, searchDate, tokenId, handlerId, source, deviceLogData);
            } else {
                hlp.myalert("日期不合法！");
            }
        });
    });
};
// get device setting
var getDeviceSetting = function (settingStatus, obj) {
    if (settingStatus == 0) {
        obj.removeAttr("checked");
        obj.val(0);
    } else {
        obj.attr("checked", "true");
        obj.val(1);
    }
};
// set device setting
var setDeviceSetting = function (settingType, obj) {
    //获取当前用户的tokenId
    var pt = hlp.panelObj["deviceDtl"];
    if (!pt) {
        return;
    }
    //获取当前用户的tokenId
    var deviceId = pt.device.deviceId.toString();
    var userType = pt.device.userType.toString();
    var tokenId = loj.Credential;
    if (userType == "primary") {
        var settingStatus = obj.val();
        var oldSettingStatus = obj.val();
        if (settingStatus == 0) {
            settingStatus = 1;
            obj.val(1);
        } else {
            settingStatus = 0;
            obj.val(0);
        }
        svc.updateDeviceSetting(deviceId, settingStatus, settingType, tokenId, function (r) {
            hlp.log("device setting result: " + r.message);
            if (r.status == "FAILURE") {
                hlp.myalert(r.message);
                if (oldSettingStatus == 0) {
                    obj.removeAttr("checked");
                    obj.val(0);
                } else {
                    obj.attr("checked", "true");
                    obj.val(1);
                }
            }
        });
    }
};
// delete device
var deleteSelectDevice = function () {
    var tokenId = loj.Credential;
    var userType = $(".myUserType").val();
    var deviceId = $(".myDeviceId").val();
    var delDeviceId = "#dev" + deviceId;
    if (userType == "primary") {
        var deleteFlg = confirm("一旦删除设备,将删除该设备所有的历史数据. 是否确认删除?");
        if (deleteFlg) {
            deleteDevice(deviceId, tokenId, $(delDeviceId));
        } else {
            return;
        }
    } else {
        deleteDevice(deviceId, tokenId, $(delDeviceId));
    }
}
// delete follow device
var deleteSelectFollowDevice = function () {
    var tokenId = loj.Credential;
    var userType = $(".myUserType").val();
    var deviceId = $(".myDeviceId").val();
    var delDeviceId = "#dev" + deviceId;
    deleteFollowDevice(deviceId, tokenId, $(delDeviceId));
}
// 删除设备
var deleteDevice = function (deviceId, tokenId, my) {
    svc.deleteDevice(deviceId, tokenId, function (r) {
        hlp.log("delete device result " + r.message);
        if (r.status == "SUCCESS") {
            my.remove();
        } else {
            hlp.myalert("删除失败!");
            $(".del-icon").hide();
        }
    });
};

// 删除我关注的设备
var deleteFollowDevice = function (deviceId, tokenId, my) {
    svc.deleteDeviceFollow(deviceId, tokenId, function (r) {
        hlp.log("delete device follow result " + r.message);
        if (r.status == "SUCCESS") {
            my.remove();
        } else {
            hlp.myalert("删除失败!");
            $(".dela-icon").hide();
        }
    });
}

//updateDeviceInfo
var updateDeviceInfo = function (deviceId, tokenId, nickName, img) {
    hlp.log("before device.js  updateDeviceInfo call...");
    svc.updateDeviceInfo(deviceId, tokenId, nickName, img, function (r) {
        if (r.status == "SUCCESS") {
            hlp.log("inside device.js updateDeviceInfo function...");
            $.afui.loadContent("#aboutDevice");
        } else {
            hlp.myalert(r.message);
        }
    });
};

// wifi重置
var wifiReset = function () {
    $.afui.loadContent("#wifiCon");

    var deviceWifiReset = hlp.panelObj["deviceWifiReset"];

    // 判断重置 OR 配置
    if (deviceWifiReset) {
        hlp.panelObj["deviceWifiReset"].isReset = true;
    }
};

// 获取设备列表
var getDeviceList = function () {
    console.log("inside getDeviceList...?");
    var tokenId = loj.Credential;

    svc.getdevicelist(tokenId, function (r) {
        hlp.log("inside call get device list.r.OwnedStatus:" + r.OwnedStatus);
        if (r.OwnedStatus == "SUCCESS") {
            hlp.bindtpl(r.OwnedDeviceList, "#myDeviceDiv", "tpl_deviceAdd");
            var deviceList = r.OwnedDeviceList;
            $("#myDeviceDiv .lt").off("tap").on("tap", function () {
                var this_deviceId = $(this).attr("device-id");
                for (var i = 0; i < deviceList.length; i++) {
                    if (deviceList[i].deviceId == this_deviceId) {
                        hlp.panelObj["deviceDtl"] = {
                            "device": deviceList[i]
                        };
                        var flg = hlp.panelObj["deviceControlerFlg"];
                        if (!flg) {
                            return;
                        } else {
                            flg.deviceControlerFlg = 1;
                        };
                    }
                }
                $.afui.loadContent("#deviceIndex");
            });
            //我的设备长按显示菜单
            $("#myDeviceDiv .lt").bind("longTap", function () {
                var userType = $(this).attr("user-type");
                var deviceId = $(this).attr("device-id");
                $(".myUserType").val(userType);
                $(".myDeviceId").val(deviceId);

                var deviceWifiReset = null;

                for (var i = 0; i < deviceList.length; i++) {
                    if (deviceList[i].deviceId == deviceId) {
                        deviceWifiReset = {
                            "isReset": false,
                            "deviceId": $(".myDeviceId").val(),
                            "userType": $(".myUserType").val(),
                            "device": deviceList[i]
                        };
                    }
                }

                if (deviceWifiReset) {
                    hlp.panelObj["deviceWifiReset"] = deviceWifiReset;
                    $.afui.actionsheet(
                        '<a onclick="setDeviceTop(0)">设备置顶</a>' +
                        '<a onclick="deleteSelectDevice()">删除设备</a>' +
                        '<a onclick="wifiReset()">WIFI重置</a>');
                }
            });
        } else {
            // 没有绑定设备
            //hlp.bindtpl("", "#myDeviceDiv", "tpl_deviceAdd");
            // 没有绑定设备
            if (r.AttentionedStatus == "SUCCESS") {
                hlp.bindtpl("", "#myDeviceDiv", "tpl_main");
            }
            hlp.log("MSG:"+r.OwnedMessage);
        }
    });
};

// 关于设备列表
var getFollowDeviceList = function () {
    var tokenId = loj.Credential;
    // get myfamilly device list
    svc.getdevicelist(tokenId, function (r) {
        hlp.log("inside call get Familallydevice list.");
        if (r.AttentionedStatus == "SUCCESS") {
            hlp.bindtpl(r.AttentionedDeviceList, "#myFollowDeviceDiv", "tpl_FollowdeviceAdd");
            $("#myFollowDeviceDiv .lt").off("tap").on("tap", function (event) {
                var my = $(this);
                var deviceId = my.attr("device-id");
                var device = { "deviceId": deviceId };
                hlp.panelObj["deviceDtl"] = { "device": device };
                var flg = hlp.panelObj["deviceControlerFlg"];
                if (!flg) {
                    return;
                } else {
                    flg.deviceControlerFlg = 0;
                };
                $.afui.loadContent("#deviceIndex");
            });
        } else {
            if (r.OwnedStatus == "SUCCESS") {
                hlp.bindtpl("", "#myFollowDeviceDiv", "tpl_FollowdeviceAdd");
            } else {
                $.afui.loadContent("#deviceList");
            }
            hlp.log(r.AttentionedMessage);
        }
        //我的关注设备长按删除
        $("#myFollowDeviceDiv .lt").bind("longTap", function () {
            var userType = $(this).attr("user-type");
            var deviceId = $(this).attr("device-id");
            $(".myUserType").val(userType);
            $(".myDeviceId").val(deviceId);
            $.afui.actionsheet(
                '<a onclick="setDeviceTop(1)">设备置顶</a>' +
                '<a onclick="deleteSelectFollowDevice()">取消关注</a>');
        });
    });
}

// 设备置顶
var setDeviceTop = function (type) {
    var tokenId = loj.Credential;
    var deviceId = $(".myDeviceId").val();
    var myType = "";
    if (type == 0) {
        myType = "controll";
    } else {
        myType = "concern";
    }
    svc.setDeviceTop(deviceId, tokenId, myType, function (r) {
        if (r.status == "SUCCESS") {
            hlp.log("set device top successful...");
            if (type == 0) { getDeviceList(); } else { getFollowDeviceList(); }
        } else {
            hlp.myalert(r.message);
        }
    });
};

//按钮弹出日志筛选框
var showSearch = function () {
    $("#filterForm").toggle(200);
};

//按钮隐藏日志筛选框
var hideSearch = function () {
    $("#filterForm").hide(200);
};

//二维码分享
var shareBarcode = function () {
    var deviceDtl = hlp.panelObj["deviceDtl"];
    var tokenId = loj.Credential;
    var deviceId = "";
    if (!deviceDtl) {
        return;
    } else {
        deviceId = deviceDtl.device.deviceId;
    };
    svc.shareBarCode(tokenId, deviceId, function (r) {
        if (r.status == "SUCCESS") {
            hlp.log(hlp.format("URL:{0,picUrl:{1},theme:{2},content:{3},", [r.URL, r.picUrl, r.theme, r.content]));
            share(r.theme, r.content, r.picUrl, r.URL, r.barCodePath, function (result) {
                /*成功后的处理*/
                hlp.myalert("二维码分享成功！");
            }, function (error) {
                /*失败后的处理*/
                hlp.myalert("二维码分享失败！");
            });
        } else {
            hlp.myalert(r.message);
        }
    });
};

//二维码保存
var saveBarcodePicture = function () {
    var barcodeDataURL = hlp.panelObj["barcodeDataURL"];
    var dataURL;
    if (!barcodeDataURL) {
        return;
    } else {
        dataURL = barcodeDataURL.dataURL;
    };
    hlp.myalert("bitmap>>>" + dataURL);
    savePicture(dataURL,
        function (event) {
            hlp.myalert("二维码保存成功 ");
        },
        function (error) {
            hlp.myalert("Scanning failed: " + error);
        });
};

//按汉堡包弹出设备菜单
var showMyDevice = function () {
    var flg = hlp.panelObj["deviceControlerFlg"];
    if (!flg) {
        return;
    }
    var controlFlg = flg.deviceControlerFlg;
    if (controlFlg == 0) {
        //用户身份为游客或粉丝时
        $(".popupMyFollowedDevice").toggle(100);
    } else {
        //用户身份为主控或副控时
        $(".popupMyDevice").toggle(100);
    }
};