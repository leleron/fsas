define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"registPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("registPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },

                sendCode:function(){
                	var mobile = $("#account").val();
                	if(mobile.length = 11){
                		$.ajax({
                			type:"post",
                			dataType:"json",
                			url:"http://121.40.104.203:8080/UserCore/service/user/check",
                			data:JSON.stringify({MOBILE:mobile}),
                			success:function (data){
                				if(data.status=="SUCCESS"){
                					var  na = Math.floor(Math.random()*9);
                                    var  nb = Math.floor(Math.random()*9);
                                    var  nc = Math.floor(Math.random()*9);
                                    var  nd = Math.floor(Math.random()*9);
                                    var  ne = Math.floor(Math.random()*9);
                                    var  nf = Math.floor(Math.random()*9);

                                    var numArray = new Array(6);
                                    numArray[0] = na;
                                    numArray[1] = nb;
                                    numArray[2] = nc;
                                    numArray[3] = nd;
                                    numArray[4] = ne;
                                    numArray[5] = nf;

                                    var numArr = numArray.join("");
                                    localStorage.setItem("numArr",numArr);
                                    alert(numArr);
                					
                				}else{
                					alert(data.message);
                				}
                			},
                			error:function(e){
                				alert(e);
                			}
                		});
                	}
                },
                
                userRegist:function(){
                    var mobile = $("#account").val();
                    var password = $("#password").val();
                    var vericode = $("#vericode").val();
                    if(mobile.length = 11){
                        if(vericode = localStorage.getItem('numArr')){
                            $.ajax({
                                type:"post",
                                dataType:"json",
                                url:"http://121.40.104.203:8080/UserCore/service/user/new",
                                data:JSON.stringify({MOBILE:mobile,PASSWORD:password}),
                                success:function (data){
                                    if(data){
                                        alert("注册成功！")
                                        localStorage.removeItem('numArr');
                                        localStorage.setItem("tokenId", data.tokenId);
                                        window.AppRouter.showMyPage();
                                    }else{
                                    	alert("系统繁忙！请稍后再试。。。");
                                    }
                                }
                            });
                        }else{
                            alert("验证码错误！请重新输入。。。");
                        }
                    }
                    
                }
                
        });
});