//SmartLinkConnect
function sConnect(ssid,spwd,successFunc,errorFunc){
	window.plugins.SmartLinkConnect.Push2Dvc(ssid,spwd,successFunc,errorFunc);
}
//EspressifConnect
function eConnect(ssid,spwd,successFunc,errorFunc){
	window.plugins.EspressifConnect.Push2Dvc(ssid,spwd,successFunc,errorFunc);
}
//wifiinfo
function getssid(successFunc,errorFunc) {
	window.wifi.message(successFunc,errorFunc);
}  
//Isfirst
function isFirst(successFunc,errorFunc) {
	window.plugins.IsFirst.isfirst(successFunc,errorFunc);
}  
//barcodesscanner
function qRcodeScanner(successFunc,errorFunc){
	window.plugins.CodeScan.codeScan(successFunc,errorFunc);
}
//FromCameraScanner
function imageQRcodeScanner(successFunc,errorFunc){
	navigator.camera.getPicture(successFunc, errorFunc, { quality: 50,
		sourceType: Camera.PictureSourceType.QRCODE,
	    destinationType: Camera.DestinationType.DATA_URL
	 });
}
//
function imageRcodeScanner(successFunc,errorFunc){
	window.plugins.PicOperate.takePhoto(successFunc,errorFunc);
}
function getPictureFromCamera(successFunc,errorFunc){
	window.plugins.PicOperate.takeCamra(successFunc,errorFunc);
}
//ThirdLogin
function qqLogin(successFunc,errorFunc){
	window.plugins.ThirdLogin.qqLogin(successFunc,errorFunc);
}
function wxLogin(successFunc,errorFunc){
	window.plugins.ThirdLogin.wxLogin(successFunc,errorFunc);
}
function jdLogin(successFunc,errorFunc){
	window.plugins.ThirdLogin.jdLogin(successFunc,errorFunc);
}
//FileOperate
function savePicture(bitmap,successFunc,errorFunc){
	window.plugins.FileOperate.savepng(bitmap,successFunc,errorFunc);
}
//Baidushare
function share(title,content,imgurl,successFunc,errorFunc){
	window.plugins.Baidushare.bdshare(title,content,"",imgurl,successFunc,errorFunc);
}