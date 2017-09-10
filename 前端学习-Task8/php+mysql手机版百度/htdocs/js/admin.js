//获得表格对象
var $newsTable = $('#newstable tbody');
//存放要删除的新闻id
var deleteId = null;
//存放要修改的新闻id
var updateId = null;
//存放file控件图片选择的路径
var imgURL = "";
//页面加载时请求后台数据
$(function() {

    //刷新后台数据
    refreshNews();
    //添加新闻
    $('#btnsubmit').on('click', addNews);

    //因为是动态生成的button,因此无法直接添加按纽绑定事件，
    //需要利用事件委托的方式给指定按纽添加onclick事件
    $newsTable.on('click', '.btn-danger', openDeleteNews);
    //确认删除后再利用ajax将删除的新闻id传递到后台进行数据库删除
    $('#deleteModal #btndelete').click(function(e) {
        if (deleteId) {
            confirmDeleteNews(deleteId);
        }
    });

    //为编辑按纽添加点击事件
    $newsTable.on('click', '.btn-primary', openUpdateNewsModal);
    $('#updateModal #btnupdate').click(function(e) {
        if (updateId) {
            confirmUpdateNews(updateId);
        }
    });
});
//加载新闻数据
function refreshNews(_type) {
    //清空所有新闻数据
    $newsTable.empty();
    //重新请求后台数据
    $.ajax({
        url: '../services/getNews.php',
        type: 'get',
        data:{newstype:_type},
        datatype: 'json',
        success: function(data) {
            data.forEach(function(item, index, array) {
                var $tdid = $('<td>').html(item.id);
                var $tdtype = $('<td>').html(item.newstype);
                var $tdtitle = $('<td>').html(item.newstitle);
                var $tdimg = $('<td>').html(item.newsimg);
                var $tdsrc = $('<td>').html(item.newssrc);
                var $tdtime = $('<td>').html(item.newstime);
                var $tdctr = $('<td>');
                var $btnupdate = $('<button>').addClass('btn btn-danger btn-xs').html('删除');
                var $btndelete = $('<button>').addClass('btn btn-primary btn-xs').html('修改').css('margin-left', '8px');
                $tdctr.append($btnupdate, $btndelete);
                var $tRow = $('<tr>');
                $tRow.append($tdid, $tdtype, $tdtitle, $tdimg, $tdsrc, $tdtime, $tdctr);
                $newsTable.append($tRow);
            });
        }
    });
}
//添加新闻
function addNews(e) {
    e.preventDefault();
    //输入判断
    if ($('#newstitle').val() === "" || imgURL === "" || $('#newssrc').val() === "" || $('#newstime').val() === "") {
        if ($('#newstitle').val() === "") {
            $('#newstitle').parent().addClass('has-error');
        } else {
            $('#newstitle').parent().removeClass('has-error');
        }
        if ($('#newstype').val() === "") {
            $('#newstype').parent().addClass('has-error');
        } else {
            $('#newstype').parent().removeClass('has-error');
        }
        if (imgURL=== "") {
        	alert("您未选择新闻图片！");
        	return;
            //$('#newsimg').css('border','1px solid #ff0000!important')
        } else {
            $('#newsimg').css('border','1px solid #ccc')
        }
        if ($('#newstime').val() === "") {
            $('#newstime').parent().addClass('has-error');
        } else {
            $('#newstime').parent().removeClass('has-error');
        }
        if ($('#newssrc').val() === "") {
            $('#newssrc').parent().addClass('has-error');
        } else {
            $('#newssrc').parent().removeClass('has-error');
        }
    }else{
        //获得表单页面所填写的数据
        var jsonNews = {
            newstitle: $('#newstitle').val(),
            newstype: $('#newstype').val(),
            newsimg: imgURL,//$('#newsimg').val(),
            newstime: $('#newstime').val(),
            newssrc: $('#newssrc').val(),
        };
        //提交数据给后台
        $.ajax({
            type: 'post',
            url: '../services/insertNews.php',
            data: jsonNews,
            datatype: 'json',
            success: function(data) {
                refreshNews();
            }
        });
    }
}
//弹出模态框待确认后再真正删除
function openDeleteNews() {
    $("#deleteModal").modal('show');
    deleteId = $(this).parent().prevAll().eq(5).html();
}
//确认删除新闻数据
function confirmDeleteNews(objId) {
    $.ajax({
        url: '../services/deleteNews.php',
        type: 'post',
        datatype: 'json',
        data: { newsid: deleteId },
        success: function(data) {
            console.log("删除成功！");

            $("#deleteModal").modal('hide');
            refreshNews();
        }
    });
}
//弹出新闻编辑模态窗口
function openUpdateNewsModal() {
    $("#updateModal").modal('show');
    updateId = $(this).parent().prevAll().eq(5).html();
    $.ajax({
        url: '../services/curNews.php',
        type: 'get',
        datatype: 'json',
        data: { newsid: updateId },
        success: function(data) {
            $("#unewstitle").val(data[0].newstitle);
            $("#unewstype").val(data[0].newstype);
            // $("#unewsimg").val(data[0].newsimg);
            $("#unewssrc").val(data[0].newssrc);
            $("#unewstime").val(data[0].newstime.split(' ')[0]);
            var textHtml = "<img src='" + data[0].newsimg + "' width='140' height='120'/>";
    		$(".umark").after(textHtml);
        }
    });
}
//点击确认后对新闻进行修改
function confirmUpdateNews(updateId) {
    $.ajax({
        url: '../services/updateNews.php',
        type: 'post',
        datatype: 'json',
        data: {
            newsid: updateId,
            newstitle: $("#unewstitle").val(),
            newstype: $("#unewstype").val(),
            newsimg: imgURL,
            newstime: $("#unewstime").val(),
            newssrc: $("#unewssrc").val(),
        },
        success: function(data) {
            $("#updateModal").modal('hide');

            refreshNews();
        }
    });
}

/*以下函数是取file图片的路径*/
function getImgURL(node) {
    try {
        var file = null;
        if (node.files && node.files[0]) {
            file = node.files[0];
        } else if (node.files && node.files.item(0)) {
            file = node.files.item(0);
        }
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
        try {
            //Firefox7.0   
            imgURL = file.getAsDataURL();
        } catch (e) {
            //Firefox8.0以上                                
            imgURL = window.URL.createObjectURL(file);
        }
    } catch (e) { //这里不知道怎么处理了，如果是遨游的话会报这个异常                   
        //支持html5的浏览器,比如高版本的firefox、chrome、ie10  
        if (node.files && node.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                imgURL = e.target.result;
            };
            reader.readAsDataURL(node.files[0]);
        }
    }
    creatImg(imgURL);
    imgURL='../images/'+node.files.item(0).name;
    return imgURL;
}

function creatImg(imgURL) { //根据指定URL创建一个Img对象  
    var textHtml = "<img src='" + imgURL + "' width='140' height='120'/>";
    $(".mark").after(textHtml);
}