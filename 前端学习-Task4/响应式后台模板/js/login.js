
    //模拟用户帐户登陆
    var checkLogin = function() {
    	//获取用户输入的帐户
        var user_account = document.getElementById("txtAccount");
        //获取用户输入的密码
        var user_password = document.getElementById("txtPassword");
        //输入验证不通过则给出提示信息并将焦点定位在当前输入框中
        if (user_account.value != "admin") {
            alert("登录帐号错误，请按文本提示内容重新输入!");
            user_account.focus();
            return false;
        } else if (user_password.value != "123") {
            alert("登录密码错误，请文本提示内容重新输入!");
            user_password.focus();
            return false;
        }
        return true;
    }
