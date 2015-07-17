define([//'jquery', 
        'underscore', 'backbone','text!page/04-4-4-1_deviceErrorList.html',
        'mec/model/deviceErrorListPageModel'
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
                "click .errorsummary":"showDeviceErrorDetail"
            },
            showDeviceErrorDetail:function(event){
                localStorage.setItem("errorid", $(event.target).data('errorid'));
                window.location.href="#deviceErrorDetail";
            }
        });
    });