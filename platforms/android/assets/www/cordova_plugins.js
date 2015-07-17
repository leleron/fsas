cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.phonegap.plugins.smartLinkConnect/www/SmartLinkConnect.js",
        "id": "com.phonegap.plugins.smartLinkConnect.SmartLinkConnect",
        "clobbers": [
            "cordova.plugins.SmartLinkConnect"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.espressifConnect/www/EspressifConnect.js",
        "id": "com.phonegap.plugins.espressifConnect.EspressifConnect",
        "clobbers": [
            "cordova.plugins.EspressifConnect"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.wifiinfo/www/cordovaWifiInfo.js",
        "id": "org.apache.cordova.wifiinfo.wifi",
        "clobbers": [
            "wifi"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.isFirst/www/IsFirst.js",
        "id": "com.phonegap.plugins.isFirst.IsFirst",
        "clobbers": [
            "cordova.plugins.IsFirst"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.fileOperate/www/FileOperate.js",
        "id": "com.phonegap.plugins.fileOperate.FileOperate",
        "clobbers": [
            "cordova.plugins.FileOperate"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.thirdLogin/www/ThirdLogin.js",
        "id": "com.phonegap.plugins.thirdLogin.ThirdLogin",
        "clobbers": [
            "cordova.plugins.ThirdLogin"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.baidushare/www/Baidushare.js",
        "id": "com.phonegap.plugins.baidushare.Baidushare",
        "clobbers": [
            "cordova.plugins.Baidushare"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.picOperate/www/PicOperate.js",
        "id": "com.phonegap.plugins.picOperate.PicOperate",
        "clobbers": [
            "cordova.plugins.PicOperate"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.codeScan/www/CodeScan.js",
        "id": "com.phonegap.plugins.codeScan.CodeScan",
        "clobbers": [
            "cordova.plugins.CodeScan"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "com.phonegap.plugins.smartLinkConnect": "0.0.1",
    "com.phonegap.plugins.espressifConnect": "0.0.1",
    "org.apache.cordova.wifiinfo": "0.1.1",
    "cordova-plugin-camera": "1.1.1-dev",
    "com.phonegap.plugins.isFirst": "0.0.1",
    "com.phonegap.plugins.fileOperate": "0.0.1",
    "com.phonegap.plugins.thirdLogin": "0.0.3",
    "com.phonegap.plugins.baidushare": "0.0.1",
    "com.phonegap.plugins.picOperate": "0.0.1",
    "cordova-plugin-inappbrowser": "1.0.1",
    "com.phonegap.plugins.codeScan": "0.0.1"
}
// BOTTOM OF METADATA
});