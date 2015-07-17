/**
 * Created by neginegi on 15-5-8.
 */

define([//'jquery',
        'underscore', 'backbone','text!page/05-2-1-1_myInfoEditName.html',
        'mec/model/myPointsPageModel'
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
                
                var userName = localStorage.getItem('userName');
                alert("userName:"+userName);
                $(this.el).find("#nameEdit").val(userName);
                $(this.el).find("#nameEdit").focus();
                alert(1);
                
                return this;
            },
            
            events: {
                'click .saveEdit':'saveEdit'
            },
            
            saveEdit:function(){   
            	this.model.editName({
            		onSuccess:function(data) {
            			alert(+">>>>>>"+data.message);
                    },
                    onFailure:function(msg) {
                    	alert(+"<<<<<<<"+msg);
                    }
            	});
            }


        });
    });