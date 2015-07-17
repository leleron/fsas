﻿var ShowLoginMsg = function (bool) {
    var lmsg = "<p align='center' class='topMessage'><a href='#login'>您的用户凭证已过期，请重新登录！</a></p>";
    $(".topMessage").remove();
    if (bool == true)
        $(".panel").prepend(lmsg);
};

// 数据访问类
var DataAccess = function () { };
DataAccess.prototype = {
    // Ajax POST
    postjson: function (url, data, callback) {
        return $.ajax({
            'type': 'POST',
            'url': url,
            'contentType': 'application/json; charset=UTF-8',
            'data': JSON.stringify(data),
            'dataType': 'json',
            'success': callback
        });
    },
    // Ajax GET
    getjson: function (url, callback) {
        return $.ajax({
            'type': 'GET',
            'url': url,
            'contentType': 'application/json; charset=UTF-8',
            'dataType': 'json',
            'beforeSend': function () {
            },
            'success': function (r) {
                callback(r);
            },
            'complete': function () {
            },
            'error': function (msg) {
            }
        });
    },
    getJsonByData: function (url, data, callback) {
        return $.ajax({
            'type': 'GET',
            'url': url,
            'contentType': 'application/json; charset=UTF-8',
            'dataType': 'json',
            'beforeSend': function () {},
            'success': callback,
            'complete': function () {},
            'error': function (msg) {},
            'data': data
        });
    },
    //Ajax PUT
    putjson: function (url, data, callback) {
        return $.ajax({
            'type': 'PUT',
            'url': url,
            'contentType': 'application/json; charset=UTF-8',
            'data': JSON.stringify(data),
            'dataType': 'json',
            'success': callback
        });
    }
};


// get business data by remote services
var Services = function () {
    this.dal = new DataAccess();
};
Services.prototype = {
    dal: null, // DataAccess
    addr_userlogin: rootuser + "/user/loginIn",
    addr_userCheck: rootuser + "/user/verify/{0}",
    addr_userRegister: rootuser + "/user/new",
    addr_devicelist: rootuser + "/device/{0}/{1}?{2}",
    addr_gdevicelist: rootuser + "/devices/{0}",
    addr_addibleproductorList: rootuser + "/find/addibleproductorList?tokenId={0}",
    addr_checkMacAddress: rootuser + "/devices/checkMacAddress?tokenId={0}&macAddress={1}",
    addr_userinfo: rootuser + "/user/{0}",
    addr_userLoginOut: rootuser + "/user/loginOut",
    // 设备添加
    addr_deviceAdd: rootuser + "/devices/add",
    // wifi重置（更新位置与Mac信息）
    addr_updateInfoForWifiReset: rootuser + "/devices/{0}/update",
    addr_identifyCode: rootuser + "/user/identifycode",
    addr_updateUserInfo: rootuser + "/user/{0}",
    addr_submitFeedback: rootuser + "/my/opinion",
    addr_aboutUs: rootuser + "/my/aboutus",
    addr_deviceAuthority: rootuser + "/devices/{0}/owners?tokenId={1}",
    add_deleteSecondary: rootuser + "/devices/{0}/deleteSecondary",
    addr_gdeviceerrorlist: rootuser + "/devices/{0}/messages?tokenId={1}",
    addr_gphonenumber: rootuser + "/find/miscellaneous/CustomerServicePhone",
    addr_deleteDeviceErrorInfo: rootuser + "/devices/messages/delete/{0}?tokenId={1}",
    addr_updateDeviceErrorInfo: rootuser + "/devices/messages/read/{0}?tokenId={1}",
    add_deviceLog: rootuser + "/devices/{0}/log ",
    addr_gdevicesetting: rootuser + "/devices/{0}/settings?tokenId={1}",
    addr_updateDeviceSetting: rootuser + "/devices/{0}/settings",
    addr_compareVersion: rootuser + "/find/currentVersion/{0}",
    addr_forgerPassSend: rootuser + "/user/check/{0}",
    addr_resetPassword: rootuser + "/user/reset",
    addr_gdevicefans: rootuser + "/devices/{0}/fans?tokenId={1}",
    addr_deleteDeviceId: rootuser + "/devices/{0}/delete",
    addr_setDeviceTop: rootuser + "/devices/{0}/setDeviceOnTop",
    addr_deleteFollowDeviceId: rootuser + "/devices/{0}/unfollow",
    addr_nearbybranch: rootuser + "/find/miscellaneous/nearbybranch",
    addr_getUserMessage: rootuser + "/my/messages?tokenId={0}",
    addr_gattentdevicelist: rootuser + "/find/attentionrank?tokenId={0}",
    addr_getnearbydevice: rootuser + "/find/nearby",
    addr_gnickdevicelist: rootuser + "/find/byDeviceNickname/{0}?tokenId={1}",
    addr_checkIfBinded: rootuser + "/devices/checkIfBinded?tokenId={0}&snCode={1}&productCode={2}",
    addr_getmessage: rootuser + "/my/messages?tokenId={0}",
    addr_updateDevice: rootuser + "/devices/{0}/updateDevice",
    addr_getProductInfo: rootuser + "/find/product?tokenId={0}&productCode={1}",
    addr_firmwareUpdateFlg: rootuser + "/devices/{0}/firmwareUpdateVersion?tokenId={1}",
    addr_getMySetting: rootuser + "/myconfigureswitch?tokenId={0}",
    addr_updateMySetting: rootuser + "/myconfigureswitch",
    addr_getDeviceCard: rootuser + "/devices/{0}/card?tokenId={1}",
    addr_deletemessage: rootuser + "/my/deletemessages",
    addr_updatemessage: rootuser + "/my/readmessages",
    addr_gettiming: rootuser + "/devices/{0}/getDeviceTimer?tokenId={1}",
    addr_settiming: rootuser + "/devices/{0}/setDeviceTimer",
    addr_thirdPartyLoginIn: rootuser + "/thirdpartyuser/loginIn",
    addr_thirdUserBindFlyco: rootuser + "/thirduserbindflyco",
    addr_accountUnbind: rootuser + "/thirduserunbindflyco/{0}",
    addr_addDeviceCardWatchLog: rootuser + "/devices/devicecardadd",
    addr_flycoBindThirdParty: rootuser + "/flycobindthirdparty",
    addr_deviceCardControl: rootuser + "/devices/devicecardcontrol",
    addr_deviceCardConcern: rootuser + "/devices/devicecardattention",
    addr_getDeviceDtl: rootuser + "/devices/{0}/regardingDevice?tokenId={1}",
    addr_getHintsDetail: rootuser + "/devices/helpInfo",
    addr_updateFirmware: rootuser + "/devices/{0}/updateFirmware",
    addr_flycoUnbindThirdUser: rootuser + "/flycounbindthirduser/{0}?unbindType={1}",
    addr_shareBarCode: rootuser + "/devices/{0}/shareBarCode",

    mall_codeLogin: rootuser + "/user/codeLoginIn",
    mall_integraln: rootuser + "/user/getIntegral/{0}",
    mall_codeDelete: rootuser + "/user/idcodedelete/{0}",

    mall_mallindex: mallRootUser + "index.get.index",
    mall_groupshopping: mallRootUser + "goods.team.goods",
    mall_paytype: mallRootUser + "order.list.payment",
    mall_addresslist: mallRootUser + "member.list.address",
    mall_orderlist: mallRootUser + "order.list.order",
    mall_logisticsdetail: mallRootUser + "order.shipping.info",
    mall_orderdetail: mallRootUser + "order.get.info",
    mall_newProduct: mallRootUser + "goods.new.goods",
    mall_secKill: mallRootUser + "goods.spikes.goods",
    mall_goodsCategory: mallRootUser + "goods.get.category",
    mall_goodsList: mallRootUser + "goods.list.goods",
    mall_goodsDetail: mallRootUser + "goods.detail.info",
    mall_refundapply: mallRootUser + "order.refund.apply",
    mall_returnapply: mallRootUser + "order.return.apply",

    mall_orderListReturn: mallRootUser + "order.list.return",
    mall_orderListRefund: mallRootUser + "order.list.refund",

    mall_getCartList: mallRootUser + "cart.list.cart", //15

    mall_getRefundList: mallRootUser + "order.get.refund", //27
    mall_getAddressList: mallRootUser + "member.list.address", //32
    mall_editAddress: mallRootUser + "member.edit.address", //33
    mall_addAddress: mallRootUser + "member.add.address", //34
    mall_delAddress: mallRootUser + "member.delete.address", //35


    mall_getRegionList: mallRootUser + "member.list.region", //35
    mall_myFavouriteList: mallRootUser + "member.list.collect", //38
    mall_delFavourite: mallRootUser + "member.delete.collect", //39
    mall_region: mallRootUser + "member.list.region",
    mall_goodsSimpleInfo: mallRootUser + "goods.simple.info",

    mall_setDefaultAddress: mallRootUser + "member.default.address", //41
    mall_getMyFavouriteList: mallRootUser + "member.list.collect", //42
    mall_delMyFavourite: mallRootUser + "member.delete.collect", //43
    mall_addMyFavourite: mallRootUser + "member.add.collect", //44
    mall_getGoodsComment: mallRootUser + "member.goods.comment", //45
    mall_getGoodsNocomment: mallRootUser + "member.goods.nocomment", //46
    mall_addComment: mallRootUser + "member.add.comment", //47
    mall_getIntegralList: mallRootUser + "member.list.integral", //48
    mall_getCheckInInfo: mallRootUser + "member.sign.info", //49
    mall_doCheckIn: mallRootUser + "member.do.sign", //50

    mall_getDefaultAddress: mallRootUser + "member.default.address",
    mall_goodsComment: mallRootUser + "goods.get.comment",
    mall_cancelOrder: mallRootUser + "order.cancel.order",
    mall_addOrder: mallRootUser + "order.add.order",
    mall_personHot: mallRootUser + "goods.person_hots",
    mall_confirmRecept: mallRootUser + "order.confirm.recept",
    mall_getPromo: mallRootUser + "promo.gi.reg",
    mall_goodsSearch: mallRootUser + "goods.search.goods",
    mall_addToMyCart : mallRootUser+"cart.add.cart",
    mall_mycart :mallRootUser+"cart.list.cart",
    mall_deleteGoodsInMyCart : mallRootUser+"cart.delete.cart",
    mall_cleanMyCart : mallRootUser+"cart.empty.cart",
    mall_baoYouLine :mallRootUser+"promo.op.shf",
    mall_deleteCollect:mallRootUser+"member.delete.collect",
    mall_addCollect:mallRootUser+"member.add.collect",
    mall_payStatus:mallRootUser+"pay.get.status",

    // 格式化输出
    psurl: function(str, args) {
        return str.replace(/\{(\d+)\}/g, function() {
            var p = arguments[0].replace(/[\{\}]/g, "");
            return args[p];
        });
    },
    // LocalKey拼接
    pslsk: function(str, args) {
        var tmpKey = "";
        for (var i = 0; i < args.length; i++) {
            tmpKey += "_" + args[i];
        }
        return str + tmpKey;
    },

    // Add Token
    addGeneralToken: function(data) {
        if (data == undefined) { data = {}; }

        data["api_name"] = api_name;
        data["api_key"] = api_key;
        data["api_token"] = api_token;

        if (typeof(localStorage.FLX_USER) == undefined ||
            localStorage.FLX_USER.trim().length == 0 ||
            typeof(JSON.parse(localStorage.FLX_USER).Credential) == undefined) {
            data["token"] = "";
        } else {
            data["token"] = JSON.parse(localStorage.FLX_USER).Credential;
        }
        return data;
    },
    /**********************************
     // k: localstorage key
     // url: service url
     // rfs: [true/false]refresh local data with services?? later
     // callback: callback function
     **********************************/
    processget: function(url, callback) {
        this.dal.getjson(url, function(r) {
            if ((r && r.code) && (r.code == "101" || r.code == "102")) {
                ShowLoginMsg(true);
            } else {
                ShowLoginMsg(false);
                callback(r);
            }
        });
    },
    processpost: function(url, data, callback) {
        this.dal.postjson(url, data, function(r) {
            if ((r && r.code) && (r.code == "101" || r.code == "102")) {
                ShowLoginMsg(true);
            } else {
                ShowLoginMsg(false);
                callback(r);
            }
        });
    },
    processput: function(url, data, callback) {
        this.dal.putjson(url, data, function(r) {
            if ((r && r.code) && (r.code == "101" || r.code == "102")) {
                ShowLoginMsg(true);
            } else {
                ShowLoginMsg(false);
                callback(r);
            }
        });
    },
    // Post

    //登录
    userAuthentication: function(moblie, password, callback) {
        var data = {
            "LOGINID": moblie,
            "PASSWORD": password
        };
        this.processpost(this.addr_userlogin, data, callback);
    },

    //登出
    userLoginOut: function(tokenId, callback) {
        var data = {
            "TOKENID": tokenId
        };
        this.processpost(this.addr_userLoginOut, data, callback);
    },

    //注册:用户验证（验证用户是否已被注册）
    userCheck: function(mobile, callback) {
        var url = this.psurl(this.addr_userCheck, [mobile]);
        this.processget(url, callback);
    },


    //注册：验证码验证
    identifyCodeCheck: function(mobile, identifyCode, callback) {
        var data = {
            "MOBILE": mobile,
            "IDENTIFY_CODE": identifyCode
        };
        this.processpost(this.addr_identifyCode, data, callback);
    },

    //注册：用户注册
    userRegister: function(userName, mobile, vericode, password, callback) {
        var data = {
            "USER_NAME": userName,
            "MOBILE": mobile,
            "IDENTIFY_CODE": vericode,
            "PASSWORD": password
        };
        this.processpost(this.addr_userRegister, data, callback);
    },
    //设备添加 设备昵称，分组设置
    deviceAdd: function(tokenid, nickname, group, latitude, longitude, SN, macAddress, productCode, callback) {
        var data = {
            "TOKENID": tokenid,
            "NICKNAME": nickname,
            "GROUP": group,
            "LATITUDE": latitude,
            "LONGITUDE": longitude,
            "SN": SN,
            "MACADDRESS": macAddress,
            "PRODUCTCODE": productCode
        };
        this.processpost(this.addr_deviceAdd, data, callback);
    },
    // wifi重置（更新位置与Mac信息）
    updateInfoForWifiReset: function(deviceId, tokenid, macAdress, latitude, longitude, callback) {
        var url = this.psurl(this.addr_updateInfoForWifiReset, [deviceId]);
        var data = {
            "tokenid": tokenid,
            "macAdress": macAdress,
            "latitude": latitude,
            "longitude": longitude
        };
        this.processpost(url, data, callback);
    },
    // update device setting
    updateDeviceSetting: function(deviceId, settingStatus, settingType, tokenId, callback) {
        var url = this.psurl(this.addr_updateDeviceSetting, [deviceId]);
        var data = {
            "TOKENID": tokenId,
            "SETTINGSTATUS": settingStatus,
            "SETTINGTYPE": settingType
        };
        this.processpost(url, data, callback);
    },

    //提交意见反馈
    submitFeedback: function(tokenId, feedbackContent, email, callback) {
        var data = {
            "TOKENID": tokenId,
            "opinionContent": feedbackContent,
            "contactMethod": email
        };
        this.processpost(this.addr_submitFeedback, data, callback);
    },
    //设备权限，当前是主控的情况下删除副控
    deleteSecondary: function(deviceId, tokenId, userId, callback) {
        var url = this.psurl(this.add_deleteSecondary, [deviceId]);
        var data = {
            "TOKENID": tokenId,
            "USER_ID": userId
        };
        this.processpost(url, data, callback);
    },
    //设备日志
    deviceLog: function(deviceId, date, tokenId, handlerId, source, callback) {
        var url = this.psurl(this.add_deviceLog, [deviceId]);
        var data = {
            "date": date,
            "TOKENID": tokenId,
            "handlerId": handlerId,
            "source": source
        };
        this.processpost(url, data, callback);
    },
    //删除消息
    delUserMessage: function(tokenId, messageId, callback) {
        var data = {
            "TOKENID": tokenId,
            "MESSAGEID": messageId
        };
        this.processpost(this.addr_deletemessage, data, callback);
    },
    //消息已读
    updateUserMessage: function(tokenId, messageId, callback) {
        var data = {
            "TOKENID": tokenId,
            "MESSAGEID": messageId
        };
        this.processpost(this.addr_updatemessage, data, callback);
    },
    //设备删除
    deleteDevice: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_deleteDeviceId, [deviceId]);
        var data = { "TOKENID": tokenId };
        this.processpost(url, data, callback);
    },
    //设备置顶
    setDeviceTop: function(deviceId, tokenId, type, callback) {
        var url = this.psurl(this.addr_setDeviceTop, [deviceId]);
        var data = {
            "TOKENID": tokenId,
            "TYPE": type,
            "ONTOP": "Y"
        };
        this.processpost(url, data, callback);
    },
    //取消关注
    deleteDeviceFollow: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_deleteFollowDeviceId, [deviceId]);
        var data = { "TOKENID": tokenId };
        this.processpost(url, data, callback);
    },
    //重置密码
    resetPassword: function(mobile, resetPassword, callback) {
        var data = {
            "MOBILE": mobile,
            "PASSWORD": resetPassword
        };
        this.processpost(this.addr_resetPassword, data, callback);
    },
    //附近网点
    nearbyBranch: function(tokenId, phonelatitude, phonelongitude, callback) {
        var data = {
            "TOKENID": tokenId,
            "PHONELATITUDE": phonelatitude,
            "PHONELONGITUDE": phonelongitude
        };
        this.processpost(this.addr_nearbybranch, data, callback);
    },
    //附近设备
    nearbydevice: function(tokenid, la, lo, callback) {
        var data = {
            "TOKENID": tokenid,
            "PHONELATITUDE": la,
            "PHONELONGITUDE": lo
        };
        this.processpost(this.addr_getnearbydevice, data, callback);
    },

    //设置我的设置
    updateMySetting: function(tokenId, settingStatus, settingType, callback) {
        var data = {
            "TOKENID": tokenId,
            "SETTINGITEM": settingType,
            "SETTINGVALUE": settingStatus
        };
        this.processpost(this.addr_updateMySetting, data, callback);
    },

    //设置定时开关
    setTiming: function(deviceId, tokenId, powerOnTime, powerOffTime, callback) {
        var url = this.psurl(this.addr_settiming, [deviceId]);
        var data = {
            "TOKENID": tokenId,
            "POWERONTIME": powerOnTime,
            "POWEROFFTIME": powerOffTime,
            "SOURCE": "App"
        };
        this.processpost(url, data, callback);
    },

    //第三方登录
    thirdPartyLoginIn: function(loginType, uid, accessToken, callback) {
        var data = {
            "LOGINTYPE": loginType,
            "UID": uid,
            "ACCESSTOKEN": accessToken
        };
        this.processpost(this.addr_thirdPartyLoginIn, data, callback);
    },

    //第三方绑飞科账号
    thirdUserBindFlyco: function(tokenId, authUserName, authUserPassWord, callback) {
        var data = {
            "TOKENID": tokenId,
            "MOBILE": authUserName,
            "PASSWORD": authUserPassWord
        };
        this.processpost(this.addr_thirdUserBindFlyco, data, callback);
    },
    //设备名片浏览记录添加
    addDeviceCardWatchLog: function(tokenId, deviceId, callback) {
        var data = {
            'TOKENID': tokenId,
            'DEVICEID': deviceId
        };
        this.processpost(this.addr_addDeviceCardWatchLog, data, callback);
    },

    //设备名片控制
    deviceCardControl: function(tokenId, deviceId, callback) {
        var data = {
            'TOKENID': tokenId,
            'DEVICEID': deviceId
        };
        this.processpost(this.addr_deviceCardControl, data, callback);
    },
    //设备名片关注
    deviceCardConcern: function(tokenId, deviceId, callback) {
        var data = {
            'TOKENID': tokenId,
            'DEVICEID': deviceId
        };
        this.processpost(this.addr_deviceCardConcern, data, callback);
    },

    //飞科绑定第三方
    flycoBindThirdParty: function(uid, loginType, tokenId, callback) {
        var data = {
            "UID": uid,
            "LOGINTYPE": loginType,
            "TOKENID": tokenId
        };
        this.processpost(this.addr_flycoBindThirdParty, data, callback);
    },
    //固件版本升级
    updateFirmware: function(tokenId, firmwareId, callback) {
        var data = {
            "TOKENID": tokenId,
            "firmwareId": firmwareId
        };
        this.processpost(this.addr_updateFirmware, data, callback);
    },
    //分享二维码
    shareBarCode: function(tokenId, deviceId, callback) {
        var url = this.psurl(this.addr_shareBarCode, [deviceId]);
        var data = {
            TOKENID: tokenId
        };
        this.processpost(url, data, callback);
    },

    // Get

    //获取用户信息
    getuserinfo: function(tokenId, callback) {
        this.processget(
            this.psurl(this.addr_userinfo, [tokenId]),
            callback);
    },
    //手动添加设备的设备ListData
    getmanuallyAddDeviceData: function(tokenId, callback) {
        var url = this.psurl(this.addr_addibleproductorList, [tokenId]);
        this.processget(url, callback);
    },
    //配置WIFI时，Mac地址有无得校验
    getMacIfBindedFlg: function(tokenId, macAddress, callback) {
        var url = this.psurl(this.addr_checkMacAddress, [tokenId, macAddress]);
        this.processget(url, callback);
    },
    //设备权限，获取主控和副控
    getDeviceAuthority: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_deviceAuthority, [deviceId, tokenId]);
        this.processget(url, callback);
    },
    // get device error list
    getDeviceErrorList: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_gdeviceerrorlist, [deviceId, tokenId]);
        this.processget(url, callback);
    },
    // delete device error list
    deleteDeviceErrorInfo: function(messageId, tokenId, callback) {
        var url = this.psurl(this.addr_deleteDeviceErrorInfo, [messageId, tokenId]);
        this.processget(url, callback);
    },
    // update device error list status
    updateDeviceErrorInfo: function(messageId, tokenId, callback) {
        var url = this.psurl(this.addr_updateDeviceErrorInfo, [messageId, tokenId]);
        this.processget(url, callback);
    },
    // get phone number
    getPhoneNumber: function(callback) {
        var url = this.psurl(this.addr_gphonenumber);
        this.processget(url, callback);
    },
    // get multi params
    getuserlist: function(type, time, callback) {
        this.processget(
            this.psurl(this.addr_userinfo, [type, time]),
            callback
        );
    },
    // get device list
    getdevicelist: function(tokenId, callback) {
        var url = this.psurl(this.addr_gdevicelist, [tokenId]);
        this.processget(url, callback);
    },
    // get device setting
    getDeviceSetting: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_gdevicesetting, [deviceId, tokenId]);
        this.processget(url, callback);
    },
    // get device fans
    getDeviceFans: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_gdevicefans, [deviceId, tokenId]);
        this.processget(url, callback);
    },
    //关于我们获取link信息
    getOtherLink: function(callback) {
        this.processget(this.addr_aboutUs, callback);
    },
    //版本比较
    getVersionInfo: function(currentVersion, callback) {
        var url = this.psurl(this.addr_compareVersion, [currentVersion]);
        this.processget(url, callback);
    },

    //重置密码时发送验证码
    forgerPassSend: function(mobile, callback) {
        var url = this.psurl(this.addr_forgerPassSend, [mobile]);
        this.processget(url, callback);
    },

    //获取我的消息
    getUserMessage: function(tokenId, callback) {
        var url = this.psurl(this.addr_getUserMessage, [tokenId]);
        this.processget(url, callback);
    },
    // get device list by nickname
    getnickdevicelist: function(nickname, tokenId, callback) {
        var url = this.psurl(this.addr_gnickdevicelist, [nickname, tokenId]);
        this.processget(url, callback);
    },
    //关注度设备排名
    getattentdevicelist: function(tokenId, callback) {
        var url = this.psurl(this.addr_gattentdevicelist, [tokenId]);
        this.processget(url, callback);
    },
    //查詢SN是否已存在
    getCheckIfBinded: function(tokenId, snCode, productCode, callback) {
        var url = this.psurl(this.addr_checkIfBinded, [tokenId, snCode, productCode]);
        this.processget(url, callback);
    },
    //我的消息
    getmessage: function(tokenId, callback) {
        var url = this.psurl(this.addr_getmessage, [tokenId]);
        this.processget(url, callback);
    },
    //获取product的信息
    getProductInfo: function(tokenId, productCode, callback) {
        var url = this.psurl(this.addr_getProductInfo, [tokenId, productCode]);
        this.processget(url, callback);
    },
    //check当前版本是否需要更新
    getFirmwareUpdateFlg: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_firmwareUpdateFlg, [deviceId, tokenId]);
        this.processget(url, callback);
    },

    //我的设置
    getMySetting: function(tokenId, callback) {
        var url = this.psurl(this.addr_getMySetting, [tokenId]);
        this.processget(url, callback);
    },
    //获取设备名片
    getDeviceCard: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_getDeviceCard, [deviceId, tokenId]);
        this.processget(url, callback);
    },
    //获取定时开关
    getTiming: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_gettiming, [deviceId, tokenId]);
        this.processget(url, callback);
    },

    //账号解除绑定
    accountUnbind: function(tokenId, callback) {
        var url = this.psurl(this.addr_accountUnbind, [tokenId]);
        this.processget(url, callback);
    },

    //关于设备，获取设备详情
    getDeviceDtl: function(deviceId, tokenId, callback) {
        var url = this.psurl(this.addr_getDeviceDtl, [deviceId, tokenId]);
        this.processget(url, callback);
    },
    //获取帮助详情
    getHintsDetail: function(callback) {
        this.processget(this.addr_getHintsDetail, callback);
    },

    //飞科账号解绑其他账号
    flycoUnbindThirdUser: function(tokenId, unbindType, callback) {
        var url = this.psurl(this.addr_flycoUnbindThirdUser, [tokenId, unbindType]);
        this.processget(url, callback)
    },

    //PUT

    //修改用户信息
    updateUserInfo: function(tokenId, username, imagesrc, callback) {
        var url = this.psurl(this.addr_updateUserInfo, [tokenId]);
        var data = {
            "USER_NAME": username,
            "IMAGE": imagesrc
        };
        this.processput(url, data, callback);
    },
    //修改設備信息
    updateDeviceInfo: function(deviceId, tokenId, nickName, img, callback) {
        var url = this.psurl(this.addr_updateDevice, [deviceId]);
        var data = {
            "TOKENID": tokenId,
            "image": img,
            "nickName": nickName
        };
        this.processput(url, data, callback);
    },

    //------------------------------------------------------------------ 商城 ------------------------------------------------------------------//

    // Get
    //超过60秒，删除数据库里的验证码
    deleteCode:function(mobile,callback){
        var url = this.psurl(this.mall_codeDelete, [mobile]);
        this.processget(url, callback);
    },

    // Post

    // No.15 我的购物车
    getCartList: function (userId, callback) {
        "use strict";

        var url = this.psurl(this.mall_getCartList);
        var data = { "user_id": userId };

        this.processpost(url, this.addGeneralToken(data), function (res) {
            if (res.status != "SUCCESS") {
                hlp.log("Call service getCartList: res.status: " + res.status + " res.message" + res.message);
            }

            if (callback) {
                callback(res);
            }
        });
    },

    // No.26 退款/退货单列表
    getRefundList: function(userId, callback) {
        "use strict";

        var url = this.psurl(this.mall_orderListRefund);
        var data = { "user_id": userId };

        this.processpost(url, this.addGeneralToken(data), function(res) {
            if (res.status != "SUCCESS") {
                hlp.log("Call service getRefundList: res.status: " + res.status + " res.message" + res.message);
            }

            if (callback) {
                callback(res);
            }
        });
    },

    getReturnList: function(userId, callback) {
        "use strict";

        var url = this.psurl(this.mall_orderListReturn);
        var data = { "user_id": userId };

        this.processpost(url, this.addGeneralToken(data), function(res) {
            if (res.status != "SUCCESS") {
                hlp.log("Call service getReturnList: res.status: " + res.status + " res.message" + res.message);
            }

            if (callback) {
                callback(res);
            }
        });
    },

    // No.27 取得订单列表
    getRefundOrReturnDetail: function(sn, callback) {
        "use strict";

        var url = this.psurl(this.mall_getRefundList);
        var data = { "sn": sn };

        this.processpost(url, this.addGeneralToken(data), function(res) {
            if (res.status != "SUCCESS") {
                hlp.log("Call service getRefundOrReturnDetail: res.status: " + res.status + " res.message" + res.message);
            }

            if (callback) {
                callback(res);
            }
        });
    },

    // No.31 收货地址列表

    // No.32 对地址信息进行修改
    editAddressList: function(data, callback) {
        var url = this.psurl(this.mall_editAddress);
        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.33 添加新的收货地址
    addAddress: function(data, callback) {
        var url = this.psurl(this.mall_addAddress);
        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.34 删除用户收货地址
    delAddress: function(addressId, userId, callback) {
        var url = this.psurl(this.mall_delAddress);
        var data = { "address_id": addressId, "user_id": userId };
        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.35 获取地区列表
    getRegionList: function(parentId, regionType, callback) {
        var url = this.psurl(this.mall_getRegionList);
        var data = { "parent_id": parentId, "region_type": regionType };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.37 取得 我的收藏 列表
    getMyFavouriteList: function(userId, pageNo, callback) {
        "use strict";

        var url = this.psurl(this.mall_myFavouriteList);
        var data = { "user_id": userId, "page": pageNo };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.38 删除 我的收藏 列表项
    delFavourite: function(userId, goodSn, callback) {
        "use strict";

        var url = this.psurl(this.mall_delFavourite);
        var data = { "user_id": userId, "goods_sn": goodSn };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.41 设置默认收货地址
    setDefaultAddress: function(addressId, userId, callback) {
        "use strict";

        var url = this.psurl(this.mall_setDefaultAddress);
        var data = { "address_id": addressId, "user_id": userId };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.45 已评论
    getGoodsComment: function(userId, pageNo, callback) {
        "use strict";

        var url = this.psurl(this.mall_getGoodsComment);
        var data = { "user_id": userId, "page": pageNo };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.46 未评论
    getGoodsNocomment: function(userId, pageNo, callback) {
        "use strict";

        var url = this.psurl(this.mall_getGoodsNocomment);
        var data = { "user_id": userId, "page": pageNo };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.47 发表评论
    // comment_type 类型（0 评论，1 追评） comment_id 评论ID（追评时传）
    addComment: function(userId, orderSn, goodSn, commentRank, content, commentType, commentId, callback) {
        "use strict";

        var url = this.psurl(this.mall_addComment);
        var data = {
            "user_id": userId,
            "order_sn": orderSn,
            "goods_sn": goodSn,
            "comment_rank": commentRank,
            "content": content,
            "comment_type": commentType,
            "comment_id": commentId
        };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.48 积分列表
    getMyPointsList: function(userId, pageNo, year, month, callback) {
        "use strict";

        var url = this.psurl(this.mall_getIntegralList);
        var data = { "user_id": userId, "page": pageNo, "year": year, "month": month };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.49 获取用户积分日志记录列表及可用积分
    getCheckInInfo: function(userId, callback) {
        "use strict";

        var url = this.psurl(this.mall_getCheckInInfo);
        var data = { "user_id": userId };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    // No.50 用户签到
    doCheckIn: function (userId, callback) {
        "use strict";

        var url = this.psurl(this.mall_doCheckIn);
        var data = { "user_id": userId };

        this.processpost(url, this.addGeneralToken(data), callback);
    },

    //商品列表
    getGoodsList: function(catId,listBy,orderForm,callback){
        var data = {
            "cat_id":catId,
            "order_type":listBy,
            "order_form":orderForm
        };
        this.processpost(this.mall_goodsList,this.addGeneralToken(data),callback);
    },

    //商品详情
    getGoodsDetail: function(goods_sn,user_id,callback){
        var data = {
            "sn":goods_sn,
            "user_id":user_id
        };
        this.processpost(this.mall_goodsDetail,this.addGeneralToken(data),callback);
    },

    // 商城首页
    getMallIndex: function(callback) {
        this.processpost(this.mall_mallindex,this.addGeneralToken(),callback);
    },

    // 获取团购信息
    groupShopping: function(callback) {
        this.processpost(this.mall_groupshopping,this.addGeneralToken(),callback);
    },

    // 在线支付类型
    getPayType: function(callback) {
        this.processpost(this.mall_paytype,this.addGeneralToken(),callback);
    },

    // 收货地址列表
    getAddressListByAddressId: function (userId, address_id, callback) {
        var data = {
            "user_id": userId,
            "address_id": address_id
        };
        this.processpost(this.mall_addresslist, this.addGeneralToken(data), callback);
    },

    getAddressList: function (userId, callback) {
        var data = {
            "user_id": userId
        };
        this.processpost(this.mall_addresslist, this.addGeneralToken(data), callback);
    },

    // 订单列表
    getOrderList: function(userId, callback) {
        var data = { "user_id": userId };
        this.processpost(this.mall_orderlist, this.addGeneralToken(data), callback);
    },

    // 订单详情
    getOrderDetail: function(orderId, userId, callback) {
        var data = {
            "order_sn": orderId,
            "user_id": userId
        };
        this.processpost(this.mall_orderdetail, this.addGeneralToken(data), callback);
    },

    // 物流信息
    getLogisticsDetail: function(orderId, callback) {
        var data = {
            "order_sn": orderId
        };
        this.processpost(this.mall_logisticsdetail, this.addGeneralToken(data), callback);
    },

    // 地区列表
    getRegion:function(parentId,regionType,callback){
        var data = {
            "parent_id":parentId,
            "region_type":regionType
        };
        this.processpost(this.mall_region,this.addGeneralToken(data),callback);
    },

    // 订单提交，商品清单
    getGoodsSimpleInfo:function(sn,callback){
        var data = {
            "sn":sn
        };
        this.processpost(this.mall_goodsSimpleInfo,this.addGeneralToken(data),callback);
    },

    // 商品分类
    getGoodsCategory: function(callback){
        this.processpost(this.mall_goodsCategory,this.addGeneralToken(),callback);
    },

    // 新品列表
    getNewProduct: function(callback){
        this.processpost(this.mall_newProduct,this.addGeneralToken(),callback);
    },

    // 秒杀列表
    getSecKill: function(callback){
        this.processpost(this.mall_secKill,this.addGeneralToken(),callback);
    },

    // 获取默认收货地址
    getDefaultAddress:function(userId,callback){
        var data = {
            "user_id":userId
        };
        this.processpost(this.mall_getDefaultAddress,this.addGeneralToken(data),callback);
    },

    // 申请退货
    returnApply: function(data, callback) {
        this.processpost(this.mall_returnapply, this.addGeneralToken(data), callback);
    },

    // 申请退款
    refundApply: function(data, callback) {
        this.processpost(this.mall_refundapply,this.addGeneralToken(data),callback);
    },

    //获取商品评论
    getCommodityComment: function(goods_sn,callback){
        var data = {
            "sn":goods_sn
        };
        this.processpost(this.mall_goodsComment,this.addGeneralToken(data),callback);
    },

    // 取消订单
    cancelOrder: function(order_sn, user_id, callback) {
        var data = {
            "order_sn": order_sn,
            "user_id": user_id
        };
        this.processpost(this.mall_cancelOrder,this.addGeneralToken(data),callback);
    },
    //订单提交
    addOrder: function(userId,addressId,sn,invType,companyName,integral,isCart,callback){
        var data = {
            "user_id": userId,
            "address_id":addressId,
            "sku": sn,
            "inv_type": invType,
            "inv_payee": companyName,
            "integral": integral,
            "is_cart": isCart
        };
        this.processpost(this.mall_addOrder,this.addGeneralToken(data),callback);
    },

    //个性化热销排行
    getPersonHots: function(catId,callback) {
        var data = {
            "api_name": api_name,
            "api_key": api_key,
            "api_token": api_token
        };
        this.processpost(this.mall_personHot, this.addGeneralToken(data), callback);
    },
    //验证码登录
    codeLogin:function(mobile,callback){
        var data={
            "MOBILE":mobile
        }
        this.processpost(this.mall_codeLogin,data,callback);
    },

    // 确认收货
    confirmRecept: function(order_sn, user_id,callback) {
        var data = {
            "user_id": user_id,
            "order_sn": order_sn
        };
        this.processpost(this.mall_confirmRecept, this.addGeneralToken(data), callback);
    },
    //获取登录获积分message
    getPromo: function (callback) {
        this.processpost(this.mall_getPromo, this.addGeneralToken(), callback);
    },
    //获取用户积分
    getintegraln:function(tokenId,callback){
        var url = this.psurl(this.mall_integraln, [tokenId]);
        this.processget(url, callback);
    },

    //首页搜索商品
    getGoodsSearch: function(searchKey,callback) {
        var data = {
            "search_key": searchKey
        };
        this.processpost(this.mall_goodsSearch, this.addGeneralToken(data), callback);
    },

    //在商品详情页面，点击加入购物车，向购物车中增加商品
    addToMyCart : function(user_id, sku_sn, choose_num, callback){
        var data={
            "user_id":user_id,
            "sku_sn":sku_sn,
            "choose_num":choose_num
        };
        this.processpost(this.mall_addToMyCart,this.addGeneralToken(data),callback);
    },

    //我的购物车-获取商品列表
    getMyCart: function(user_id,callback) {
        var data = {
            "user_id":user_id
        };
        this.processpost(this.mall_mycart, this.addGeneralToken(data), callback);
    },

    //我的购物车-删除单个商品
    deleteGoodsInMyCart : function(user_id,rec_id,callback){
        var data = {
            "user_id":user_id,
            "id":rec_id
        };
        this.processpost(this.mall_deleteGoodsInMyCart,this.addGeneralToken(data),callback);
    },

    //我的购物车-清空购物车
    clearnMyCart : function(user_id,callback){
        var data={
            "user_id":user_id
        };
        this.processpost(this.mall_cleanMyCart,this.addGeneralToken(data),callback);

    },
    //订单满*元包邮
    getBaoYouLine:function(callback){
        this.processpost(this.mall_baoYouLine, this.addGeneralToken(), callback);
    },

    //删除收藏
    deleteCollect: function(user_id,goods_sn,callback){
        var data = {
            "user_id":user_id,
            "goods_sn":goods_sn
        };
        this.processpost(this.mall_deleteCollect,this.addGeneralToken(data),callback);
    },

    //增加收藏
    addCollect: function(user_id,goods_sn,callback){
        var data = {
            "user_id":user_id,
            "goods_sn":goods_sn
        };
        this.processpost(this.mall_addCollect,this.addGeneralToken(data),callback);
    },

    //付款状态
    getPayStatus: function(order_sn, callback) {
        var data = {
            "order_sn": order_sn
        };
        this.processpost(this.mall_addCollect,this.addGeneralToken(data),callback);
    }

    // Put

};