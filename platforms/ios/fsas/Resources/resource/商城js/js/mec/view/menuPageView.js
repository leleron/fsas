define([//'jquery', 
        'underscore', 'backbone','text!page/menuPage.html',
        'mec/model/menuPageModel'
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
      'click #farmmachinery,#necessities,#chemical,#seed,#living':'secondMenu',
      'click #dis_sele>div>div':'showCheckShopPage',
      //点击跳转到区域划分商铺列表
      'click #check_shop_by_add>div>div':'checkAdd',
      //点击跳转商品列表
      'click #menu_find_shop':'showshopPage',
      //点击跳转到商铺列表
      'click #menu_find_check':'showCheckShopPage'
      
      
    },
	secondMenu:function(e){
	var id='#'+e.currentTarget.id.substring(0,4)+'_sele';
	localStorage.setItem("second_menu_flag",id);
	window.AppRouter.showSecondMenuPage();
    },

	//点击跳转到商铺列表
	showCheckShopPage:function(e){
		alert("2222");
		localStorage.setItem('shopslist',"input");
		var search_string = $('#search_hide').val();
		if(search_string=="搜索商品/商铺"){
			search_string="";
		}
    	setTimeout(function(){  window.AppRouter.showCheckShopPage(search_string);},200);
    },
    //点击跳转商品列表
    showshopPage:function(){

    	localStorage.setItem('goodslist',"input");
    	var search_string = $('#search_hide').val();
    	if(search_string=="搜索商品/商铺"){
			search_string="";
		}
		localStorage.setItem("flag",3);
    	window.AppRouter.showCommodityPage(search_string);


    },
    //跳转商铺页面按区域划分传地域id
    checkAdd:function(e){
	    var obj=e.currentTarget;
	    $(obj).children().eq(0).css('background-color','#56c640');
	    $(obj).find(".next_text_style").css('color','#fff');
	    $(obj).find("img").attr('src','images/h-13-1.png');
	    localStorage.setItem("shopslist","region");
	    window.AppRouter.showCheckShopPage();
    }
  });
});