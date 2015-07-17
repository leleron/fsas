define([//'jquery',
        'underscore', 'backbone','text!page/06_userManagement.html',
        'mec/model/userMenagerPageModel'
    ],
    function(//$,
        _, Backbone, mainView,mainModel){

        return cpmView = Backbone.View.extend({

            template:_.template(mainView),

            initialize : function() {

            },

            refresh: function(){

            },

            render: function(){
                $(this.el).empty();
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            },

            events: {
            }
        });
    });
/**
 * Created by 20150100 on 2015/5/5.
 */
