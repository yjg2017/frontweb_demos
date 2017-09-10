$(function(){
	$(".header-nav li").first().addClass("active");
	$(".banner-num li").first().addClass("on");

	//图片轮播计数器
	var i=0;
	//克隆出轮播器第一个元素
	var clone = $(".jk-banner .banner-container .banner-img li").first().clone();
	//追加到当前轮播器末尾,用于无缝轮播效果
	$(".jk-banner .banner-container .banner-img").append(clone);
	//统计出当前轮播元素Size
	var imgSize = $(".jk-banner .banner-container .banner-img li").length;
	/*轮播器左按纽*/
	$(".banner-arrow-left").click(function(){
		moveL();
	});
	
	/*轮播器右按纽*/
	$(".banner-arrow-right").click(function(){
		moveR();		
	});
	function moveL(){
		i++;
		if(i==imgSize){//判断是否向左点到最后一张
			//如果点到最后一张(实际上是克隆的那张也就是第一张图),利用CSS瞬间复位(肉眼是看不出来此动作)
			$(".jk-banner .banner-container .banner-img").css({left:0});
			//复位后将计数器定位在第二张图上，这样完成了无缝轮播
			i=1;
		}
		$(".jk-banner .banner-container .banner-img").stop().animate({left:-i*750},500);
		if(i==(imgSize-1))
			$(".banner-num li").eq(0).addClass("on").siblings().removeClass("on");
		else
			$(".banner-num li").eq(i).addClass("on").siblings().removeClass("on");
	}
	function moveR(){
		i--;
		if(i==-1){
			$(".jk-banner .banner-container .banner-img").css({left:-(imgSize-1)*750});
			i=imgSize-2;
		}
		$(".jk-banner .banner-container .banner-img").stop().animate({left:-i*750},500);
		$(".banner-num li").eq(i).addClass("on").siblings().removeClass("on");
	}
	
	/*鼠标滑入图片索引方块*/	
	$(".jk-banner .banner-num li").hover(function(){
		var index = $(this).index();
		$(".jk-banner .banner-container .banner-img").stop().animate({left:-index*750},500);
		$(this).addClass("on").siblings().removeClass("on");
	})

	/*自动轮播*/
	var t=setInterval(moveL,5000);
		
	/*banner定时器鼠标滑入时应停止自动播放,移开继续运行自动轮播*/
	$(".jk-banner").hover(function () {
		clearInterval(t);
	},function(){
		t=setInterval(moveL,5000);
	})

	/*首页头部导航搜索框触发显示*/
	$("#btn-search").click(function(){
		$(".header-login .searchbox").addClass("scale");
	})
	/*首页头部导航搜索框触发关闭*/
	$("#close-btn").click(function(){
		$(".header-login .searchbox").removeClass("scale");
	})
	/*回到顶部*/
	$("#goTop").click(function(){
		var speed=300;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
	})

});
/*浏览器滚动条超过指定高度显示回到顶部按纽*/
window.onload=function(){
	var pagelookHeight=document.documentElement.clientHeight;
	window.onscroll=function(){
		var backtop=document.body.scrollTop;
		if(parseInt(backtop)+880>=pagelookHeight){
			$("#goTop").addClass("top");
		}
		else
		{
			$("#goTop").removeClass("top");
		}
	}
}