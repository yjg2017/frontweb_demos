//入口函数
if (window.localStorage && getStorage('jquery')!=null) {
	addFile(getStorage('normalize'), "css");
	addFile(getStorage('iconfont'), "css");
    addFile(getStorage('main'), "css");
    addFile(getStorage('jquery'), "js");
    addFile(getStorage('news'), "js");
} else {//否则加载文件夹下相应文件
	addFile("../css/normalize.css", "css");
	addFile("../font/iconfont.css", "css");
    addFile("../css/main.css", "css");
    addFile("../js/jquery.min.js", "js");
    addFile("../js/news.js", "js");
    
    
    saveStorage('jquery','../js/jquery.min.js');
    saveStorage('news','../js/news.js');
    saveStorage('normalize','../css/normalize.css');
    saveStorage('iconfont','../font/iconfont.css');
    saveStorage('main','../css/main.css');
}

//辅助方法1：动态添加js，css文件引用
function addFile(url, fileType) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var link;
    if (fileType == "js") {
        link = document.createElement("script");
        link.type = "text/javascript";
        link.src = url;
    } else {
        link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.rev = "stylesheet";
        link.media = "screen";
        link.href = url;
    }
    head.appendChild(link);
}

//保存至localstorage
function saveStorage(name,value){
	localStorage.setItem(name,value);
}
//获得localstorage，以恢复上次所选主题色
function getStorage(name){
	if(localStorage.getItem(name)!='undefined'){
		return localStorage.getItem(name);
	}
}