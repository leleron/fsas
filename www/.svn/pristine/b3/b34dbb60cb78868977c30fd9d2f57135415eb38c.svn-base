define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
    return Backbone.Model.extend({
		defaults: {},
	    modelName:"deviceListPageModel",
    	fetchFromLocalStorageSuccessfull:false,
        initialize : function() {
            var _this = this;
        },
        getDeviceList:function(option) {
            var _this = this;
            //从数据模型中获得设备名
            var search_key = _this.get('search_key');
            //alert('deviceListPageModel::getDeviceList():'+search_key);

            //使用AJAX从服务器获得数据
            $.ajax({
                type:"get",
                dataType: "json",
                url:"http://192.168.52.128:8080/server.php",
                data:{gid:"getdevicelist",search_key:search_key},
                success:function(data) {
                    _this.set('data', data);
                    option.onSuccess(data);
                }
            });
        }
    });
});
