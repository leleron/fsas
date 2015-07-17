define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
    return Backbone.Model.extend({
		defaults: {},
	    modelName:"followRankPageModel",
    	fetchFromLocalStorageSuccessfull:false,
        initialize : function() {
            var _this = this;
        }
    });
});
