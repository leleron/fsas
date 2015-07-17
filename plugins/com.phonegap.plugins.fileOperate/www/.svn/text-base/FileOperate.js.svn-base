cordova.define("cordova/plugins/FileOperate", 
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var FileOperate = function() {};
    FileOperate.prototype.savepng = function(bitmap,successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("FileOperate failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("FileOperate failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'FileOperate', 'savepng', [bitmap]);
    };
	
    var FileOperate = new FileOperate();
    module.exports = FileOperate;

});

  
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.FileOperate) {
    window.plugins.FileOperate = cordova.require("cordova/plugins/FileOperate");
}

