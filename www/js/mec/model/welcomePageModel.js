define(['backbone', 'underscore','localstorage'],
    function(Backbone, _) {
        return Backbone.Model.extend({
            defaults: {},
            modelName:"welcomePageModel",
            //	fetchSuccessfull:false,
            fetchFromLocalStorageSuccessfull:false,

            localStorage: new Backbone.LocalStorage("welcomePageModel"),

            initialize : function() {
                var _this = this;
            }

        });
    });