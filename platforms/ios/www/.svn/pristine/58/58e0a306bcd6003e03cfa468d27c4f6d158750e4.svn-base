define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"aboutDevicePageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("aboutDevicePageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },
                getMyDeviceDtl:function(){
                    var _this = this;
                    var myDeviceList=JSON.parse(localStorage.getItem("myDeviceList"));
                    var thisDeviceId=localStorage.getItem("thisDeviceId");
                    for(var i= 0;i<myDeviceList.length;i++){
                       //s alert("myDevice"+i+myDeviceList[i].deviceId);
                        if(myDeviceList[i].deviceId==thisDeviceId){
                            _this.set('data',myDeviceList[i]);
                            break;
                        }
                    }
                }
            
        });
});