cordova.define("com.phonegap.plugins.smartLinkConnect.SmartLinkConnect", function(require, exports, module) { cordova.define("cordova/plugins/SmartLinkConnect", 
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var SmartLinkConnect = function() {};
    SmartLinkConnect.prototype.Push2Dvc = function(ssid,spwd,successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("SmartLinkConnect failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("SmartLinkConnect failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'SmartLinkConnect', 'push2dvc', [ssid,spwd]);
    };

	SmartLinkConnect.prototype.getSSid = function(successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("SmartLinkConnect failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("SmartLinkConnect failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'SmartLinkConnect', 'getssid', []);
    };
	
    var SmartLinkConnect = new SmartLinkConnect();
    module.exports = SmartLinkConnect;

});

  
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.SmartLinkConnect) {
    window.plugins.SmartLinkConnect = cordova.require("cordova/plugins/SmartLinkConnect");
}


});
