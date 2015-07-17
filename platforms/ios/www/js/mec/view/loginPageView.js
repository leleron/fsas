define([//'jquery', 
        'underscore', 'backbone','text!page/05-1-2_loginPage.html',
        'mec/model/loginPageModel'
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
        'click .login':'doLogin'
    },
    //登录
    doLogin:function(){
        var mobile = $('#account').val();
        var password = $('#password').val();
        if (mobile=="") {
            alert('请输入手机号码');
            $('#account').focus();
            return;
        } else if (password=="") {
            alert('请输入密码');
            $('#password').focus();
            return;
        } else {
//            var pattern =/^1[3|4|5|7|8][0-9]\d{4,8}$/;  //京东自营号码前三号码:170
//            var reg = new RegExp(pattern);
//            if (!reg.test(mobile) ) {
//                alert('请输入正确的手机号码');
//                $('#account').focus();
//                $('#account').select();
//                return;
//            }
//            pattern =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
//            reg = new RegExp(pattern);
//            if(!reg.test(password)) {
//                alert('请输入正确的密码');
//                $('#password').focus();
//                $('#password').select();
//                return;
//            }
            //服务器检证并前往预设的“我的”画面
            this.model.checkLogin({
                onSuccess:function(tokenId) {
                    var nextPage = localStorage.getItem('next_page');
                    localStorage.removeItem('next_page');
                    localStorage.setItem("tokenId", tokenId);
                    window.location.href = "#"+nextPage;
                },
                onFailure:function(msg) {
                    alert(msg);;
                    $('#account').focus();
                    $('#account').select();
                }
            });
        }
    }
  });
});