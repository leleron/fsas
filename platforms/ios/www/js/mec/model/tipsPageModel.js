define(['backbone', 'underscore','localstorage'],
    function(Backbone, _) {
        return Backbone.Model.extend({
            defaults: {},
            modelName:"tipsPageModel",
            //	fetchSuccessfull:false,
            fetchFromLocalStorageSuccessfull:false,

            localStorage: new Backbone.LocalStorage("tipsPageModel"),

            initialize : function() {
                var _this = this;
            }

        });
    });
