define(['backbone', 'underscore','localstorage'],
    function(Backbone, _) {
        return Backbone.Model.extend({
            defaults: {},
            modelName:"deviceSearchPageModel",
            //	fetchSuccessfull:false,
            fetchFromLocalStorageSuccessfull:false,

            localStorage: new Backbone.LocalStorage("deviceSearchPageModel"),

            initialize : function() {
                var _this = this;
            }

        });
    });/**
 * Created by Administrator on 2015/5/6.
 */
