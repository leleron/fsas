define([//'jquery',
        'underscore', 'backbone','text!page/03-3-4-2_hintsDetail.html',
        'mec/model/hintsDetailPageModel'
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

                //var myTips = this.model.get('data').tipsList;
                //var myTipsList = "";
                //
                //for(var i=0; i<myTips.length;i++){
                //    myTipsList +=
                //        "<li>"+"<p>"+myTips[i].tipContent+"</p>"+"</li>"
                //}
                //
                //$(this.el).find("#tipsList").append(myTipsList);
                return this;
            },

            events: {
            }
        });
    });