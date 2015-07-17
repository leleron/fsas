define([//'jquery',
        'underscore', 'backbone','text!page/03-1-0_ manuallyAdd.html',
        'mec/model/manuallyAddPageModel'
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
    });/**
 * Created by Administrator on 2015/5/6.
 */
