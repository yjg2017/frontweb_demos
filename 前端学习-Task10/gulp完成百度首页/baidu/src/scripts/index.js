$(function(){
	//鼠标移入更多产品显示侧边栏
	$('.more').on('mouseover',function(){
		$('.more').css("color","#fff");
		$('.ul_sidebar').css("display","block");
	});
	$('.ul_sidebar').on('mouseover',function(){
		$('.ul_sidebar').css("display","block");

	});
	$('.sidebar_more').on('mouseover',function(){
		$('.ul_sidebar').css("display","block");

	});
	//鼠标移开更多产品隐藏侧边栏
	$('.ul_sidebar').on('mouseout',function(){
		$('.ul_sidebar').css("display","none");
	});

	$('.st').on('mouseover',function(){
		$('.ul_stmenu').css("display","block");
	});

	$('.ul_stmenu').on('mouseover',function(){
		$('.ul_stmenu').css("display","block");
	});
	//鼠标移入设置按纽显示具体内容div
	$('.st').on('mouseout',function(){
		$('.ul_stmenu').css("display","none");
	});
	//鼠标移开设置按纽隐藏内容div
	$('.ul_stmenu').on('mouseout',function(){
		$('.ul_stmenu').css("display","none");
	});

	//点击登录弹出阴影层并显示登录框
	$("#bd_login").bind('click',openLogin);
	$(".close_btn").bind('click',closeLogin);

	$('.loginbtn').bind('click',login);

	//点击登录用户的帐号显示个人信息
	$('.lg').on('mouseover',function(){
		if($('.account').val()!=null && $('.account').val()!=""){
				$('.ul_userinfo').css("display","block");
			}
		});
	
	$('.lg').on('mouseout',function(){
		$('.ul_userinfo').css("display","none");
	});
	$('.ul_userinfo').on('mouseover',function(){
		$('.ul_userinfo').css("display","block");
	});
	$('.ul_userinfo').on('mouseout',function(){
		$('.ul_userinfo').css("display","none");
	});

	$("#news_more").css("display","none");
	$("#tab_1").css("display","none");
	$("#tab_2").css("display","none");
	$("#tab_3").css("display","none");

	//点击查看更多事件
	$('.more-bar').on('click',function(){
		$('.more-news').fadeIn(500);
		$('.footer').fadeOut(400);
		$('.header').fadeOut();
		$('.s-header').fadeIn(500);
		$('.page').css("margin-top","60px");
	});
	$(window).on('scroll',scrollhandler);
	//回到顶部　
	$('.toTop').on('click',goTop);
	/*==========================绑定换肤事件 begin==========================*/
	var currentbg =1 ;
	//
	$('.hf').on('click',function(){
		$('.hf-header').animate({ height: "288px" }, 500);
		$("#mi-header").addClass('mi-header');
		$('.left_header').css('color','#fff');
	});
	$('.p2').on('click',function(){
		$('.hf-header').animate({height:"0px"},500);
	});
	$('.hf-bgCon img').on('mouseover',function(){
		currentbg = $(this).index();
		$('.hf-bgyl').css("background",'url(./images/bg'+currentbg+'.jpg)');
		$('.hf-bgyl').css("background-size",'264px 180px');
	});
	$('.hf-bgCon img').on('click',function(){
		$('body').css("background",'url(./images/bg'+currentbg+'.jpg)');
		$('.bg img').attr("src","./images/logo_white.png");
		$('.tab-container').css("background","rgba(255,255,255,0.9)");
		$('#ul_header a').css("color","#fff");
		$('.footer a,.footer p').css("color","#fff");
		$('.more-bar span').css("color","#fff");
		$('.hf-header').animate({height:"0px"},500);
	});
	/*==========================绑定换肤事件 end===========================*/

	//获得可tab对象对其绑定点击事件
	$(".menu_item").on('click',function(){
		$("#"+this.id).addClass("current").siblings().removeClass("current").fadeIn(100);
		switch(this.id){
			case "mine":
				$(".tab-content .tab-mine").fadeIn(100).siblings().css("display","none");
				$('.more-bar').css("display","none");
				break;
			case "tj":
				$(".tab-content .tab-tj").fadeIn(100).siblings().css("display","none");
				$('.more-news').css("display","none");
				$('.more-bar').css("display","block");
				break;
			case "dh":
				$(".tab-content .tab-dh").fadeIn(100).siblings().css("display","none");
				$('.more-bar').css("display","none");
				break;
		}
	})
	//初始化footer样式
	$('.footer').css({"width":"100%","position":"fixed","bottom":"5px"});
});
//打开登录框
function openLogin(){
	var b_width=$('body').width();//获得当前浏览器宽度
	var b_height=$('body').height();//获得高度
	$(".fullbg").css({//将阴影层显示出来
		height:b_height,
		width:b_width,
		display:"block"
	});
	$('.loginDiv').show();//再把登录的div显示出来
}
function closeLogin(){
	$('.loginDiv').hide();
	$(".fullbg").hide();
}
function login(){
	var account = $('.account');
	var pwd     = $('.pwd');
	//ajax跨域请求出错，暂时不去后台验证直接代码判断了
	if(account.val()=="" || account.val()==""){
		alert("用户帐号不能为空！");
		return ;
	}
	if(account.val()!="admin" && account.val()!="user")
	{
		alert("用户帐号不正确！");
		return ;
	}
	if(pwd.val()!="123"){
		alert("用户密码不正确！");
		return;
	}
	saveUser('uname',account.val());
	closeLogin();
	
	loginUserForm();
}
//用户登录后初始化工作，如调整部分元素样式……。
function loginUserForm(){
	$('.wrapper').css("min-width","1000px");
	$('.header').css("height","220px");
	//登录后将搜索框距顶端的高度往上调
	$('.form').css({"top":"0%"});
	$('#ul_header').css({"margin":"5px 0 5px 0"});
	$('.sidebartitle').css({"padding-top":"0px","height":"36px","line-height":"36px"});

	//用户登录后将搜索框位置往上调
	$('.searchform').css("top","0%");
	//登录的用户才可以看的内容
	$('.page').fadeIn(200);

	//由于登录后，头部右则导航总体往上移了高度，也相应把隐藏的设置内容div往上移
	$('.ul_stmenu').css("top","34px");

	//隐藏底部的二维码
	$('.qrcodeCon').css("display","none");

	$('#tab_2').css("display","block")

	//登录后隐藏登录功能，显示用户信息功能
	$('.lg').text($(".account").val());

	//隐藏导航tab页中的内容切换时再显示
	$(".tab-dh").css("display","none");

	$(".tab-mine").css("display","none");
	$('.left_header').css("display","block");

	$('.footer').css({"position":"relative"});

	$('.more-news').css("display","none");

	$('.ul_userinfo').css('background','#fff');

	$('.ul_stmenu').css('background','#fff');
}
//tab页点击事件
function tabclick(){
	// $('.menu_container span')
}
//保存至localstorage
function saveUser(name,value){
	localStorage.setItem(name,value);
}
//获得localstorage，以恢复上次所选主题色
function getUser(name){
	if(localStorage.getItem(name)!='undefined'){
		return localStorage.getItem(name);
	}
}
//鼠标滚动改变头部样式
function scrollhandler(){
	if($(window).scrollTop()>100){
			$('.more-news').fadeIn(500);
			// $('.footer').fadeOut(400);
			// $('.header').fadeOut();
			$('.s-header').fadeIn(500);
			$('.page').css("margin-top","60px");
			$('.toTop').fadeIn(400);
			// $('.more-bar').fadeOut();
		}else{
			// $('.more-news').fadeOut(500);
			// $('.footer').fadeIn(400);
			$('.header').fadeIn();
			$('.s-header').fadeOut(500);
			// $('.page').css("margin-top","0px");
			$('.toTop').fadeOut(100);
	}
}
function goTop(){
	//当点击跳转链接后，回到页面顶部位置
	// $(".toTop").on('click',function(){
		$('body,html').animate({scrollTop:0},300);
		return false;
	// });
}
function setbackground(){

}
