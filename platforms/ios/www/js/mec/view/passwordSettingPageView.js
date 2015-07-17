define([//'jquery', 
        'underscore', 'backbone','text!page/05-1-5_PasswordSetting.html',
        'mec/model/passwordSettingPageModel'
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