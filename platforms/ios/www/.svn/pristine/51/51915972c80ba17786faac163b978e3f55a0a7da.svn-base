define([//'jquery', 
        'underscore', 'backbone',
        'text!page/03-1-3-1_deviceNearby.html',
        'mec/model/deviceNearbyPageModel'
        ],
    function(//$,
            _, Backbone,
            mainView,
            mainModel){
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
                'click .item_name':'showNameCardPage'
            },
            showNameCardPage:function(event) {
                //localStorage.setItem("deviceName",event.target.id);
                localStorage.setItem("deviceID",$(event.target).data('deviceid'));
                window.AppRouter.showNameCardPage();
            },
        });
    }
);

