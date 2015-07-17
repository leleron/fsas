define([//'jquery',
        'underscore', 'backbone','text!page/03-1-4-1_attentionRank.html',
        'mec/model/attentionRankPageModel'
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
            }


        });
    });/**
 * Created by Administrator on 2015/5/7.
 */
