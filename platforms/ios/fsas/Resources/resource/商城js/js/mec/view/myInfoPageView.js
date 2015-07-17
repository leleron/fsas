define([//'jquery', 
        'underscore', 'backbone',
        'text!page/05-2-1_myInfo.html',
        'mec/model/myInfoPageModel'
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

                ////从数据模型中取得设备信息
                var userinfo = this.model.get('data');
                //头像
//                $(this.el).find("#showicon").attr('src', 'images/'+userinfo.showicon);
                s//昵称
                $(this.el).find("#nickname").text(userinfo.result.USER_NAME);
                ////密码
//                $(this.el).find("#password").val(userinfo.password);
                ////性别
//                if (userinfo.gender==0) {
//                    $(this.el).find("#radio1_0").attr("checked", true);
//                } else {
//                    $(this.el).find("#radio1_1").attr("checked", true);
//                }
                ////地区
//                $(this.el).find("#area").text(userinfo.area);
                ////年龄
//                $(this.el).find("#age").text(userinfo.age);
                ////真实姓名
//                $(this.el).find("#realname").text(userinfo.realname);
                ////家庭地址
//                $(this.el).find("#homeaddress").text(userinfo.homeaddress);
                ////手机号码
//                $(this.el).find("#telno").text(userinfo.telno);
                ////微信
//                $(this.el).find("#webchat").text(userinfo.webchat);
                ////QQ
//                $(this.el).find("#qqnum").text(userinfo.qqnum);
                ////新浪微博
//                $(this.el).find("#sinawb").text(userinfo.sinawb);

                return this;
            },
            events: {
                'click .logout':'doLogout'
            },
            doLogout:function(){
            	this.model.doLogOut({
            		onSuccess:function() {
            			localStorage.removeItem('tokenId');
            			window.location.href = "#main";
            			
                    },
                    onFailure:function(msg) {
                        alert(msg);
                    }
            	});
            }
        });
    }
);

