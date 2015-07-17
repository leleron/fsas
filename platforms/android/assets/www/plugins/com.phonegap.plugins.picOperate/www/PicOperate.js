cordova.define("com.phonegap.plugins.picOperate.PicOperate", function(require, exports, module) { cordova.define("cordova/plugins/PicOperate", 
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var PicOperate = function() {};
    PicOperate.prototype.takePhoto = function(successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("PicOperate failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("PicOperate failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'PicOperate', 'takePhoto', []);
    };
	
	PicOperate.prototype.takeCamra = function(successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("PicOperate failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("PicOperate failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'PicOperate', 'takeCamra', []);
    };

    var PicOperate = new PicOperate();
    module.exports = PicOperate;

});

  
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.PicOperate) {
    window.plugins.PicOperate = cordova.require("cordova/plugins/PicOperate");
}


});
