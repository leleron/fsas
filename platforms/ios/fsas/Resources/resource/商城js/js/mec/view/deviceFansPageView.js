define([//'jquery',
        'underscore', 'backbone','text!page/04-4-2-1_deviceFans.html',
        'mec/model/deviceFansPageModel'
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
                var fans = $(this.el).find("#fans");
                var newFans = this.model.get('data').newFans;
                var oldFans = this.model.get('data').oldFans;
                newFansSetting(newFans, fans);
                oldFansSetting(oldFans, fans);
                return this;
            },

            events: {
            }
        });
        
        // 新粉丝设置
        function newFansSetting(newFans, fans) {
            $.each(newFans, function(i) {
            	var html = '<li><a href="#" style="height:6.625em;"><img src="' + newFans[i].img + '" style="margin:0.6rem 0 0 0.6rem;width: 5rem"><h2>' + newFans[i].name + '</h2><p class="ui-li-count"></p></a></li>';
            	fans.append(html);
            });
        }
        // 旧粉丝设置
        function oldFansSetting(oldFans, fans) {
        	$.each(oldFans, function(i) {
            	var html = '<li><a href="#" style="height:6.625em;"><img src="' + oldFans[i].img + '" style="margin:0.6rem 0 0 0.6rem;width: 5rem"><h2>' + oldFans[i].name + '</h2></a></li>';
            	fans.append(html);
            });
        }
    });