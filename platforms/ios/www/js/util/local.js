﻿// user info, save into local
var localObject = function () {
    this.initLocalObject();
    console.log(JSON.stringify(this));
};
localObject.prototype = {
    LOCAL_SAVEING_KEY: "FLX_USER",
    LogFlg:"",
    IsLogin: false,
    UserName: "",
    NickName: "",
    InputNickName: "",
    Mobile: "",
    QuantityInCart:0,
    patternPw: "",
    Credential: "",
    UserId:"",
    UserEntity: {},
    Latitude:"",
    Longitude:"",
    LoginType:"",
    Image:"",
    WelecomePage: true,
    initLocalObject: function () {
        console.log("in initLocalObject");
        if ($.localStorage.get(this.LOCAL_SAVEING_KEY) != null) {
            console.log("loc is not null");
            var uo = $.localStorage.get(this.LOCAL_SAVEING_KEY);
                this.IsLogin = true;
                this.WelecomePage = true;
                this.LogFlg = uo.LogFlg;
                this.UserName = uo.UserName;
                this.Mobile = uo.Mobile;
                this.Credential = uo.Credential;
                this.LoginType = uo.LoginType;
                this.UserId = uo.UserId;
                this.patternPw = uo.patternPw;
                this.NickName = uo.NickName;
                this.InputNickName = uo.InputNickName;
        } else {
            console.log("loc is null");
            this.IsLogin = false;
            this.WelecomePage = true;
            this.ShowPatternPw = false;
        }
    },
    setLogFlg: function (logflg) {
        this.LogFlg = logflg;
        this.updateObj();
    },
    setWelecomePage: function (flg) {
        this.WelecomePage = flg;
        this.updateObj();
    },
    setOnline: function (obj,loginType) {
        this.IsLogin = true;
        this.Credential = obj.tokenId;
        this.UserId = obj.userId;
        this.LoginType = loginType;
        this.updateObj();
    },
    setOffline: function(){
        this.IsLogin = false;
        this.Credential = "";
        this.UserId = "";
        this.LoginType = "";
        this.clearObj();
    },
    setEntity: function (obj) {
        this.IsLogin = true;
        this.UserName = obj.USER_NAME;
        this.Mobile = obj.MOBILE;
        this.updateObj();
    },
    setNickName: function (nn) {
        this.NickName = nn;
        this.updateObj();
    },
    setpatternPw: function (pw) {
        this.patternPw = pw;
        this.updateObj();
    },
    setInputNickName: function (inn) {
        this.InputNickName = inn;
        this.updateObj();
    },
    setCredential: function (cdt) {
        this.Credential = cdt;
        this.updateObj();
    },
    setTude: function(lat,long){
        this.Latitude = lat;
        this.Longitude = long;
    },
    updateObj: function () {
        $.localStorage.set(this.LOCAL_SAVEING_KEY, this);
    },
    clearObj: function () {
        $.localStorage.remove(this.LOCAL_SAVEING_KEY);
        this.IsLogin = false;
    }
};