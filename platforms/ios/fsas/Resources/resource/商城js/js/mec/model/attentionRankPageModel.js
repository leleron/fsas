define(['backbone', 'underscore','localstorage'],
    function(Backbone, _) {
        return Backbone.Model.extend({
            defaults: {},
            modelName:"attentionRankPageModel",
            //	fetchSuccessfull:false,
            fetchFromLocalStorageSuccessfull:false,

            localStorage: new Backbone.LocalStorage("attentionRankPageModel"),

            initialize : function() {
                var _this = this;
            }
        });
    });/**
 * Created by Administrator on 2015/5/7.
 */
