define([//'jquery', 
        'underscore', 'backbone','text!page/04-3-1-1_deviceIndex.html',
        'mec/model/deviceIndexPageModel'
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
            	'click #deviceLog':'showDeviceLogPage',
            	'click #deviceAuthority':'showDeviceAuthorityPage',
            	'click #deviceMenu':'showAuthorityMenu'
            },
            showDeviceLogPage:function(){               
                window.AppRouter.showDeviceLogPage("","","");
            },           
            showDeviceAuthorityPage:function(){
                window.AppRouter.showDeviceAuthorityPage("");
            },
            showAuthorityMenu:function(){
                $("#authorityMenu").attr('style','display: block;position: fixed; top: 40px; right:5px');
            }
        });
    });