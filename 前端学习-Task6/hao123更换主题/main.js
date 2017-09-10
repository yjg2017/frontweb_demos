
/*根据类名（class值）获取元素
 * api: getElementsByClass(oParent, target)
 * 参数说明:
 * oParent:父节点，在该节点的子节点中进行遍历
 * target:目标类名（class值）
 */
function getElementsByClass(oParent, target) {

       var aEle = oParent.getElementsByTagName('*');
       var aResult = [];
       var reg = new RegExp('\\b' + target + '\\b', 'i');
       var i = 0;

       for(i = 0; i < aEle.length; i++) {
              if(reg.test(aEle[i].className)) {
                  aResult.push(aEle[i]);
              }
       }

       return aResult;
}
//当前主题
var cur="green";
/*页面初始化函数用于绑定主题更换事件*/
window.onload=function(){

	var themeDiv = document.getElementById('body');
	//获得四种主题色对象
    var currentTheme = getElementsByClass(themeDiv, 'theme');
    //为每个主题色div添加点击事件
    for(var i = 0; i < currentTheme.length; i++) {
        if(currentTheme[i].addEventListener){
        	currentTheme[i].addEventListener("click",setTheme,false);
        }else if(currentTheme[i].attachEvent){
        	currentTheme[i].attachEvent("onclick",setTheme);
        }else{
        	currentTheme[i].onclick=setTheme;
        }
    }
	//获取上次更换的主题
	loadTheme();
}
//页面刷新或重新打开浏览器时获取localstorage内的主题值
function loadTheme(){
	var themeDiv= document.getElementById("body");
	//根据当前文档查找出所有带有theme_green样式的对象
	var currentThemes = getElementsByClass(themeDiv, 'theme_green');
	var themeHistory;
	if(getTheme("theme") !=undefined){
		themeHistory=getTheme("theme");
	}else{
		themeHistory="green";
	}
	var _color;
	//判断当前点击的主题对象

	switch(themeHistory){
		case "red":
			_color="#ff0000";
			break;
		case "yellow":
			_color="#ffcc00";
			break;
		case "blue":
			_color="#0000ff";
			break;
		case "green":
			_color="#118850";
			break;
	}
	//以下逻辑需要再优化，基本上是指定id的对象对其更改颜色
	var brObj=document.getElementById("menus");
	brObj.style.borderTop="1px solid "+_color;

	var homeObj=document.getElementById("home");
	homeObj.style.background=_color;

	var qwObj=document.getElementById("qw");
	qwObj.style.borderLeft="1px solid "+_color;
	qwObj.style.borderBottom="1px solid "+_color;

	var qwtjObj=document.getElementById("qwtj");
	qwtjObj.style.color=_color;

	var ly1Obj=document.getElementById("ly1");
	ly1Obj.style.border="1px solid "+_color;

	for(var i=0;i<currentThemes.length;i++){
		currentThemes[i].style.color=_color;
	}
}
/*更换主题色*/
function setTheme(){
	
	var themeDiv= document.getElementById("body");
	//根据当前文档查找出所有带有theme_green样式的对象
	var currentThemes = getElementsByClass(themeDiv, 'theme_green');

	var _color;
	//判断当前点击的主题对象

	switch(this.id){
		case "red":
			_color="#ff0000";
			break;
		case "yellow":
			_color="#ffcc00";
			break;
		case "blue":
			_color="#0000ff";
			break;
		case "green":
			_color="#118850";
			break;
	}
	//以下逻辑需要再优化，基本上是指定id的对象对其更改颜色
	var brObj=document.getElementById("menus");
	brObj.style.borderTop="1px solid "+_color;

	var homeObj=document.getElementById("home");
	homeObj.style.background=_color;

	var qwObj=document.getElementById("qw");
	qwObj.style.borderLeft="1px solid "+_color;
	qwObj.style.borderBottom="1px solid "+_color;

	var qwtjObj=document.getElementById("qwtj");
	qwtjObj.style.color=_color;

	var ly1Obj=document.getElementById("ly1");
	ly1Obj.style.border="1px solid "+_color;

	for(var i=0;i<currentThemes.length;i++){
		currentThemes[i].style.color=_color;
	}
	saveTheme("theme",this.id);
}
//保存至localstorage
function saveTheme(name,value){
	localStorage.setItem(name,value);
}
//获得localstorage，以恢复上次所选主题色
function getTheme(name){
	if(localStorage.getItem(name)!='undefined'){
		return localStorage.getItem(name);
	}
}
