cordova.define("cordova/plugins/IsFirst", 
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var IsFirst = function() {};
    IsFirst.prototype.isfirst = function(successCallback, errorCallback) {
        if (errorCallback == null) { errorCallback = function() {}}
    
        if (typeof errorCallback != "function")  {
            console.log("IsFirst failure: failure parameter not a function");
            return
        }
    
        if (typeof successCallback != "function") {
            console.log("IsFirst failure: success callback parameter must be a function");
            return
        }
    
        exec(successCallback, errorCallback, 'IsFirst', 'isfirst', []);
    };
	
    var IsFirst = new IsFirst();
    module.exports = IsFirst;

});

  
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.IsFirst) {
    window.plugins.IsFirst = cordova.require("cordova/plugins/IsFirst");
}

