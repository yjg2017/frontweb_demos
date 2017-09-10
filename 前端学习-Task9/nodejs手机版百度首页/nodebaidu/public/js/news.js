$(function(){
	refreshNews('all');
	//为页面头部导航标签a添加点击事件
	$('nav a').on('click',function(){
		//获得点击的标签文本
    	var type=$(this).text();
    	//后台请求数据
    	refreshNews(type);
    });
    //监听浏览器的鼠标滚动
	window.onscroll = function(){
		//监听滚动条，大于一定高度出现回到顶部按纽,否则隐藏回到顶部按纽
		if($(window).scrollTop()>100){
			$(".toTop").fadeIn(500);
		}else{
			$(".toTop").fadeOut(500);
		}
		
	}
});
//刷新后台数据
function refreshNews(_type){
	//动态创建ul标签
	var $list=$('article ul');
	//先删除之前的列表数据再加载
	$list.empty();
	//ajax请求后台数据
	$.ajax({
		url:'/news',
		type:'get',
		data:{newstype:_type},
		datatype:'json',
		success:function(data){
			data.forEach(function(item,index,array){
				//向ul插入li标签并添加样式news-item
				var $lsitItem=$('<li></li>').addClass('news-item').prependTo($list);
				//向listitem插入img标签并添加news-img样式
				var $newsImg=$('<div></div>').addClass('news-img').appendTo($lsitItem);
				//向listitem插入新闻内容图片
				var $img = $('<img>').attr('src',item.newsimg).appendTo($newsImg);
				//向listitem插入新闻内容文字
				var $content = $('<div></div>').addClass('news-content').appendTo($lsitItem);
				//向div(content)插入h1新闻标题
				var $h1 = $('<h1></h1>').html(item.newstitle).appendTo($content);
				//向div(content)插入p标签
				var $p = $('<p></p>').appendTo($content);
				//向p标签中插入新闻时间和来源
				var $newsTime = $('<span></span>').addClass('newstime').html(item.newstime).appendTo($p);
				var $newsSrc = $('<span></span>').addClass('newssrc').html(item.newssrc).appendTo($p);
			});
			
		}
	});

	
}