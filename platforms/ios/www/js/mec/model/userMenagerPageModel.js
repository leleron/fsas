define(['backbone', 'underscore','localstorage'],
    function(Backbone, _) {
        return Backbone.Model.extend({
            defaults: {},
            modelName:"userMenagerPageModel",
            //	fetchSuccessfull:false,
            fetchFromLocalStorageSuccessfull:false,

            localStorage: new Backbone.LocalStorage("userMenagerPageModel"),

            initialize : function() {
                var _this = this;
            }

        });
    });/**
 * Created by 20150100 on 2015/5/5.
 */
