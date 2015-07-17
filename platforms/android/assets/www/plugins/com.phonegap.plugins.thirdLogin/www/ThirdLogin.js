cordova.define("com.phonegap.plugins.thirdLogin.ThirdLogin", function(require, exports, module) { cordova.define("cordova/plugins/ThirdLogin", 
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var ThirdLogin = function() {};
    ThirdLogin.prototype.qqLogin = function(successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("ThirdLogin failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("ThirdLogin failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'ThirdLogin', 'qqLogin', []);
    };
	
	ThirdLogin.prototype.wxLogin = function(successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("ThirdLogin failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("ThirdLogin failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'ThirdLogin', 'wxLogin', []);
    };

	ThirdLogin.prototype.jdLogin = function(successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("ThirdLogin failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("ThirdLogin failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'ThirdLogin', 'jdLogin', []);
    };

    var ThirdLogin = new ThirdLogin();
    module.exports = ThirdLogin;

});

  
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.ThirdLogin) {
    window.plugins.ThirdLogin = cordova.require("cordova/plugins/ThirdLogin");
}


});
