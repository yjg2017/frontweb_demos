
$(function(){
	//模拟的后台json数据
	var imgDatas={"imgs":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"},{"src":"18.jpg"}]}
	//文档基础结构完成后默认加载15张图片
	initform();
	//监听window的onload对象
	$(window).on("load",function(){
		//重新摆放第二排以后的图片
		imgLocation();
		//当点击跳转链接后，回到页面顶部位置
		$(".toTop").on('click',function(){
			$('body,html').animate({scrollTop:0},500);
			return false;
		});
		//监听浏览器的鼠标滚动，监听到鼠标滚动到(最后一张图的时候取当前图片至顶端的距离再加上自身图片的一半高度来作为临界点)指定高度时再继续加载图片
		window.onscroll = function(){
			//监听滚动条，大于一定高度出现回到顶部按纽,否则隐藏回到顶部按纽
			if($(window).scrollTop()>100){
				$(".toTop").fadeIn(500);
			}else{
				$(".toTop").fadeOut(500);
			}
			//往下滚动，将加载更多图片(模拟的后台数据)
			if(scrollSide()){
			
				$.each(imgDatas.imgs,function(idx,val){
					//为每一张图片创建一个box盒子并添加样式然后添加到总容器(container)中
					var box = $("<div>").addClass("box").appendTo($("#container"));
					//添加一个div来承载img
					var content =$("<div>").addClass("content").appendTo(box);
					//创建img
					var img = $("<img>").attr("src","./images/"+$(val).attr("src")).appendTo(content);
				});
				imgLocation();
			}
		}
	});
});
//初始化页面时默认加载16张图片
function initform(){
	for(var i=0;i<16;i++){
		var box = $("<div>").addClass("box").appendTo($("#container"));
		//添加一个div来承载img
		var content =$("<div>").addClass("content").appendTo(box);
		//创建img
		var img = $("<img>").attr("src","./images/"+(i+1)+".jpg").appendTo(content);
	}
	//imgLocation();
}
//鼠标滚动加载事件
function scrollSide(){
	var box = $('.box');
	//获得最后一张照片距顶端的高度(还需要加上最后一张图片自身高度的一半)
	var lastboxHeight= box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
	//获得当前屏幕的高度
	var documentHeight = $(document).width();
	//获得当前鼠标滚动的高度(鼠标往下滚动时滚动条距顶端的高度)
	var scrollHeight = $(window).scrollTop();

	return (lastboxHeight<scrollHeight+documentHeight)?true:false; 
}
//设置图片摆放位置
function imgLocation(){
	//获得存放图片的div对象box
	var box = $('.box');
	//获取第一张图片的宽度
	var boxWidth= box.eq(0).width();
	//获得当前屏幕(一行)能放入图片的个数,取整数
	//var num = Math.floor($(window).width()/boxWidth);
	var num = Math.floor(1080/boxWidth);//这里由于自定义了区域宽度所以不需要获取整个屏幕的宽度
	//boxArr
	 //存储所有图片盒子的高度,目的是确定一排当中高度最小的那张图，
	 //以便下一排的最高的图片位置放至其下面
	var boxArr = [];
	//遍历box
	box.each(function(idx,val){
		//获取每当前盒子box的高度
		var boxHeight = box.eq(idx).height();//由于自定义了marginTop:100,所以这里要加上100的距离
		if(idx<num){
			boxArr[idx]=boxHeight;//依次存入各自图片的高度
		}else{
			//获得最小图片的高度
			var minboxHeight = Math.min.apply(null,boxArr);
			// 获得最小高度的图片索引位置
			var minboxIndex = $.inArray(minboxHeight,boxArr);
			//获得当前图片对象,以便重新定位其摆放位置
			$(val).css({
				position:"absolute",
				top:minboxHeight,
				left:box.eq(minboxIndex).position().left
			});
			//重新计算其高度
			boxArr[minboxIndex]+=box.eq(idx).height();
		}
	});
}
