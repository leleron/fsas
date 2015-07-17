define(['backbone', 'underscore','localstorage'], 
function(Backbone, _) {
        return Backbone.Model.extend({
        		defaults: {},
        	    modelName:"feedbackPageModel",
            	//	fetchSuccessfull:false,
            	fetchFromLocalStorageSuccessfull:false,
            	
        	    localStorage: new Backbone.LocalStorage("feedbackPageModel"),
        	    
                initialize : function() {
                	var _this = this;
                },

            submitButton : function() {
                var textareaContent = $('#textarea').val();
                var textinputContent = $('#textinput').val();
                alert(textareaContent+"++"+textinputContent);
                $.ajax({
                    type:"get",
                    dataType:"json",
                    url:"http://localhost:8080/server.php",
                    data:{gid:"feedback",content1:textareaContent,content2:textinputContent},
                    success:function (data){
                        if(data == 0){
                            alert("感谢您的建议！");
                        }
                    }
                });
            }
        });
});