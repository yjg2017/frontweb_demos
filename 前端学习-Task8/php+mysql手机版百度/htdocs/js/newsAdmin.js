//获得表格对象
var $newsTable = $('#newstable tbody');
//存放要删除的新闻id
var deleteId = null;
//存放要修改的新闻id
var updateId = null;
//存放file控件图片选择的路径
var imgURL = "";
$(function() {

    //刷新后台数据
    refreshNews('');
    //弹出添加新闻窗口
    $('#btnAdd').on('click', openAddNews);
    //保存新闻
    $('#btnsave').on('click',saveNews);

    //因为是动态生成的button,因此无法直接添加按纽绑定事件，
    //需要利用事件委托的方式给指定按纽添加onclick事件
    $newsTable.on('click', '.red', openDeleteNews);
    //确认删除后再利用ajax将删除的新闻id传递到后台进行数据库删除
    $('#deleteModal #btndelete').click(function(e) {
        if (deleteId) {
            confirmDeleteNews(deleteId);
        }
    });

    //为编辑按纽添加点击事件
    $newsTable.on('click', '.blue', openUpdateNewsModal);
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
                var $tdtime = $('<td>').html(item.newstime);
                var $tdsrc = $('<td>').html(item.newssrc);
                var $tdimg = $('<td>').html(item.newsimg);
                var $tdctr = $('<td>');
                var $btnupdate = $('<button>').addClass('btn red mini').html('删除');
                var $btndelete = $('<button>').addClass('btn blue mini').html('修改').css('margin-left', '8px');
                $tdctr.append($btnupdate, $btndelete);
                var $tRow = $("<tr class=odd>");
                $tRow.append($tdid, $tdtype, $tdtitle, $tdimg, $tdsrc, $tdtime, $tdctr);
                $newsTable.append($tRow);
            });
        }
    });
}
//弹出模态框待确认后再真正删除
function openAddNews() {
     $("#addModal").modal('show');
}
//弹出模态框待确认后再真正删除
function openDeleteNews() {
    $("#deleteModal").modal('show');
     deleteId = $(this).parent().prevAll().eq(5).html();
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
             $("#unewsimg").val(data[0].newsimg);
            $("#unewssrc").val(data[0].newssrc);
            $("#unewstime").val(data[0].newstime.split(' ')[0]);
            // var textHtml = "<img src='" + data[0].newsimg + "' width='140' height='120'/>";
            // $(".umark").after(textHtml);
        }
    });
}
function saveNews(e){
    e.preventDefault();
    //输入判断
    if ($('#newstitle').val() === "" || $('#newsimg').val() === "" || $('#newssrc').val() === "" || $('#newstime').val() === "") {
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
        if ($('#newsimg').val()=== "") {
            $('#newsimg').css('border','1px solid #ff0000!important')
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
            newsimg: $('#newsimg').val(),
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
                $("#addModal").modal('hide');
                refreshNews('');
            }
        });
    }
}
//确认删除新闻数据
function confirmDeleteNews(objId) {
    $.ajax({
        url: '../services/deleteNews.php',
        type: 'post',
        datatype: 'json',
        data: { newsid: deleteId },
        success: function(data) {
            $("#deleteModal").modal('hide');
            refreshNews();
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
            newsimg: $('#newsimg').val(),
            newstime: $("#unewstime").val(),
            newssrc: $("#unewssrc").val(),
        },
        success: function(data) {
            $("#updateModal").modal('hide');

            refreshNews();
        }
    });
}