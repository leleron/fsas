define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
    return Backbone.Model.extend({
		defaults: {},
	    modelName:"deviceNearbyPageModel",
    	fetchFromLocalStorageSuccessfull:false,
        initialize : function() {
            var _this = this;
        }
        
    });
});
