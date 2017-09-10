/**
 * 单例模式-提供一个构造器作为全局访问点供使用者调用,采用了闭包形式,只爆露一个init函数
 * 隐藏了其他不必要的函数,这样外界调用者只要了解怎么调用,并不关心内部是怎么实现的
 */
var baiduPage = (function() {
    //实例对象
    var _instance;
    //当前背景主题
    var currentbg;
    return {
        init: function() {
            if (_instance === undefined) {
                _instance = _constructor();
            }
            return _instance;
        }
    }

    function _constructor() {
        _render();
        _bind();

    };

    //获取当前dom要操作的元素
    function _render() {

        //导航中'设置'链接对象
        $a_st = $('.st');
        $ul_stmenu = $('.ul_stmenu');

        //导航中'更多产品'链接
        $a_more = $('.more');
        $ul_sidebar = $('.ul_sidebar');

        //弹出登录框按纽
        $open_login = $('#open_login');
        //登录按纽
        $btn_login = $('#btn_login');
        //关闭登录框按纽
        $btn_close = $('#btn_close');

        //用户登录后要设置的样式对象
        $loginStyle = {
            $wrapper: $('.wrapper'), //设置总容器的最小宽度
            $header: $('.header'), //设置头部导航高度
            $form: $('.form'),
            $ul_header: $('#ul_header'),
            $sidebartitle: $('.sidebartitle'),
            $searchform: $('.searchform'), //用户登录后将搜索框位置往上调
            $page: $('.page'), //登录的用户才可以看的内容
            $ul_stmenu: $('.ul_stmenu'), //由于登录后，头部右则导航总体往上移了高度，也相应把隐藏的设置内容div往上移
            $qrcodeCon: $('.qrcodeCon'), //隐藏底部的二维码
            $tab_2: $('#tab_2'),
            $lg: $('.lg'), //登录后隐藏登录按纽，显示用户信息功能
            $tab_dh: $(".tab-dh"), //登录后默认显示推荐内容，隐藏导航
            $tab_mine: $(".tab-mine"), //登录后默认显示推荐内容，隐藏我的关注
            $left_header: $('.left_header'), //设置头部左侧的内容
            $footer: $('.footer'), //设置底部样式
            $more_news: $('.more-news'),
            $ul_userinfo: $('.ul_userinfo'),
            $ul_stmenu: $('.ul_stmenu')
        };
        //选项卡对象
        $menu_item = $(".menu_item");
        //换肤链接对象
        $hfStyle = {
            $hf: $('.hf'), //头部换肤按纽
            $shrink: $('.p2'), //收起换肤div按纽
            $hf_bgCon_img: $('.hf-bgCon img') //背景图点击换肤对象
        }
        //新闻查看更多对象
        $more_bar = $('.more-bar');
        $_win = $(window);
        $toTop = $('.toTop');
    };
    //为dom元素绑定事件
    function _bind() {
        //鼠标滑入'更多产品'时展现出更多产品侧边栏
        $a_more.bind('mouseover', function() {
            $ul_sidebar.css('display', 'block');
        });
        $ul_sidebar.bind('mouseover', function() {
            $ul_sidebar.css({ 'display': 'block' });
        });
        //鼠标移出'更多产品'时隐藏产品侧边栏
        $ul_sidebar.bind('mouseout', function() {
            $ul_sidebar.css({ 'display': 'none' });
        });

        //鼠标滑入'设置'展现出设置栏
        $a_st.bind('mouseover', function() {
            $ul_stmenu.css('display', 'block');
        });
        $ul_stmenu.bind('mouseover', function() {
            $ul_stmenu.css('display', 'block');
        })

        //鼠标移出'设置'隐藏设置栏
        $a_st.bind('mouseout', function() {
            $ul_stmenu.css('display', 'none');
        });
        $ul_stmenu.bind('mouseout', function() {
            $ul_stmenu.css('display', 'none');
        })

        //弹出用户登录框
        $open_login.bind('click', function() {
            var b_width = $('body').width(); //获得当前浏览器宽度
            var b_height = $('body').height(); //获得高度
            $(".fullbg").css({ //将阴影层显示出来
                height: b_height,
                width: b_width,
                display: "block"
            });
            $('.loginDiv').show(); //再把登录的div显示出来
        })
        //关闭登录框
        $btn_close.bind('click', _clostLogin);
        //用户登录
        $btn_login.bind('click', _validateLogin);

        //tab选项卡
        $menu_item.bind('click', _clickTab);
        //绑定点击换肤动作
        $hfStyle.$hf.bind('click', function() {
            //显示出换肤的div对象
            $('.hf-header').animate({ height: "288px" }, 500);
        });
        $hfStyle.$shrink.bind('click', function() {
            //显示出换肤的div对象
            $('.hf-header').animate({ height: "0" }, 500);
        });
        $hfStyle.$hf_bgCon_img.bind('mouseover', function() {
            currentbg = $(this).index();
            $('.hf-bgyl').css("background", 'url(./images/bg' + currentbg + '.jpg)');
            $('.hf-bgyl').css("background-size", '264px 180px');
        });
        $hfStyle.$hf_bgCon_img.bind('click', function() {
            $('body').css("background", 'url(./images/bg' + currentbg + '.jpg)');
            $('.bg img').attr("src", "./images/logo_white.png");
            $('.tab-container').css("background", "rgba(255,255,255,0.9)");
            $('#ul_header a').css("color", "#fff");
            $('.footer a,.footer p').css("color", "#fff");
            $('.more-bar span').css("color", "#fff");
            $('.hf-header').animate({ height: "0px" }, 500);
            $("#mi-header").addClass('mi-header');
            $('.left_header').css('color', '#fff');
        });
        //查看更多新闻
        $more_bar.bind('click', function() {
            $('.more-news').fadeIn(500);
            $('.footer').fadeOut(400);
            $('.header').fadeOut();
            $('.s-header').fadeIn(500);
            $('.page').css("margin-top", "60px");
        });
        //监听滚动条
        $_win.bind('scroll', function() {
            if ($(window).scrollTop() > 100) {
                $('.more-news').fadeIn(500);
                $('.s-header').fadeIn(500);
                $('.page').css("margin-top", "60px");
                $('.toTop').fadeIn(400);
            } else {
                $('.header').fadeIn();
                $('.s-header').fadeOut(500);
                $('.toTop').fadeOut(100);
            }
        });
        //回到顶部
        $toTop.bind('click',function(){
            $('body,html').animate({scrollTop:0},300);
        // return false;
        });
    };
    //验证用户登录(模拟用户帐号未采用db)
    function _validateLogin() {
        var account = $('.account') || '';
        var pwd = $('.pwd') || '';

        if (account.val() == "") {
            alert("用户帐号不能为空！");
            return;
        }
        if (account.val() != "admin" && account.val() != "user") {
            alert("用户帐号不正确！");
            return;
        }
        if (pwd.val() != "123") {
            alert("用户密码不正确！");
            return;
        }
        _saveUser('uname', account.val());
        _clostLogin();
        _initLoginPage();
    }
    //设置登录后用户所看到的页面样式
    function _initLoginPage() {
        $loginStyle.$wrapper.css("min-width", "1000px");
        $loginStyle.$header.css("height", "220px");
        //登录后将搜索框距顶端的高度往上调
        $loginStyle.$form.css({ "top": "0%" });
        $loginStyle.$ul_header.css({ "margin": "5px 0 5px 0" });
        $loginStyle.$sidebartitle.css({ "padding-top": "0px", "height": "36px", "line-height": "36px" });

        //用户登录后将搜索框位置往上调
        $loginStyle.$searchform.css("top", "0%");
        //登录的用户才可以看的内容
        $loginStyle.$page.fadeIn(200);

        //由于登录后，头部右则导航总体往上移了高度，也相应把隐藏的设置内容div往上移
        $loginStyle.$ul_stmenu.css("top", "34px");

        //隐藏底部的二维码
        $loginStyle.$qrcodeCon.css("display", "none");

        $loginStyle.$tab_2.css("display", "block")

        //登录后隐藏登录功能，显示用户信息功能
        $loginStyle.$lg.text($(".account").val());

        //隐藏导航tab页中的内容切换时再显示
        $loginStyle.$tab_dh.css("display", "none");

        $loginStyle.$tab_mine.css("display", "none");
        $loginStyle.$left_header.css("display", "block");

        $loginStyle.$footer.css({ "position": "relative" });

        $loginStyle.$more_news.css("display", "none");

        $loginStyle.$ul_userinfo.css('background', '#fff');

        $loginStyle.$ul_stmenu.css('background', '#fff');
    }
    //关闭登录框
    function _clostLogin() {
        $('.loginDiv').hide();
        $(".fullbg").hide();
    }
    //选项卡点击 
    function _clickTab() {
        $("#" + this.id).addClass("current").siblings().removeClass("current").fadeIn(100);
        switch (this.id) {
            case "mine":
                $(".tab-content .tab-mine").fadeIn(100).siblings().css("display", "none");
                $('.more-bar').css("display", "none");
                break;
            case "tj":
                $(".tab-content .tab-tj").fadeIn(100).siblings().css("display", "none");
                $('.more-news').css("display", "none");
                $('.more-bar').css("display", "block");
                break;
            case "dh":
                $(".tab-content .tab-dh").fadeIn(100).siblings().css("display", "none");
                $('.more-bar').css("display", "none");
                break;
        }
    }
    //保存至localstorage
    function _saveUser(name, value) {
        localStorage.setItem(name, value);
    }
    //获得localstorage，以恢复上次所选主题色
    function _getUser(name) {
        if (localStorage.getItem(name) != 'undefined') {
            return localStorage.getItem(name);
        }
    }
    //鼠标滚动改变头部样式
    function _scrollhandler() {

    }

    function _goTop() {
        //当点击跳转链接后，回到页面顶部位置
        // $(".toTop").on('click',function(){
        $('body,html').animate({ scrollTop: 0 }, 300);
        return false;
        // });
    }
})();
//document文档骨架已准备完毕开始调用
$(function() {
    /*调用公有的方法来获取实例:*/
    baiduPage.init();
});