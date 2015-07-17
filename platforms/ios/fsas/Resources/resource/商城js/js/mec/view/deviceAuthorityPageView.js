define([//'jquery',
        'underscore', 'backbone','text!page/04-4-1-2_deviceAuthority.html',
        'mec/model/deviceAuthorityPageModel'
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
                var ownerList=this.model.get('data').deviceOwners;
                var mianOwnerHTML="";
                var assistantOwnerHTML="";
                var allOwner="";               
                for(var i=0;i<ownerList.length;i++){
                    if(ownerList[i].userType=="primary"){
                        mianOwnerHTML+=
                            "<li id='"+ownerList[i].userId+"' class=\"superadmin\">"+
                            "<img src='" + ownerList[i].userHeadPortrait + "' style=\"width: 4rem;height: 4rem\"/>"+
                            "<h2>"+ownerList[i].userName+"</h2>"+
                            "</li>";
                    }else if(ownerList[i].userType=="secondary"){                    	
                        assistantOwnerHTML+=
                            "<li id='assistantOwner"+ownerList[i].userId+"' class=\"admin\">"+
                            "<img src='" + ownerList[i].userHeadPortrait + "' style=\"width: 4rem;height: 4rem\"/>"+
                            "<h2 id='"+ownerList[i].userName+"'>"+ownerList[i].userName+"</h2>"+
                            "</li>";
                    }else{
                        mianOwnerHTML="";
                        assistantOwnerHTML="";
                    }
                }
                allOwner="<li data-role=\"list-divider\" data-theme=\"c\">设备主控</li>"+ mianOwnerHTML+
                "<li data-role=\"list-divider\" data-theme=\"c\">设备可控</li>"+assistantOwnerHTML;

                $(this.el).find("#Owner").append(allOwner);
                return this;
            },

            events: {
            }
        });
    });