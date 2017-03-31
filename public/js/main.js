$(document).ready(function(){
 $("#owl-example").owlCarousel({
    // Most important owl features
    items : 4,
    pagination : true,
    paginationSpeed : 1000,
    navigation : true,
    navigationText : ["","<i class='fa fa-angle-right'></i>"],
    slideSpeed : 800,
 });
	$("#navigation").sticky({
		topSpacing : 75,
	});
	$('#nav').onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 15000,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'easeInOutExpo'
	});

     $('#top-nav').onePageNav({
         currentClass: 'active',
         changeHash: true,
         scrollSpeed: 1200
    });
    //Initiat WOW JS
    new WOW().init();
});
/*验证邮箱*/
function ValidateEmail(email) {
    var isemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email);
    if (!isemail) {
        return false;
    }
    return true;
}
//======================更多项目================
var list_project = function () {
    var pageIndex= parseInt($("#pageIndex").val());
    $.get("/tools/list_ajax.ashx", { act: "list_project",pageSize:6,pageIndex:pageIndex,t: new Date() }, function (data) {   
        var obj = eval('(' + data + ')');
        if (obj.status > 1) {
            $("#pageIndex").val(pageIndex+1);
            $("#list_project").append(obj.msg);
        } else {
            $("#list_project_more").html("没有更多啦");
            setTimeout(function () { $("#list_project_more").hide(); }, 3000);
        }
    });
}
//======================注册================
var send_mail=function() {
    var user_name = $("#user_name").val(), email = $("#email").val(), message = $("#message").val();
    if (user_name.length <1) {
        alert("请写下您的姓名！");
        $("#user_name").focus();
        return;
    }
    /*邮箱验证*/
    if (!ValidateEmail(email)) {
    alert("请写下的电子邮件地址格式不正确！");
        $("#email").focus();
        return;
    }
    if (message.length < 6) {
        alert("请写下的您的信息不能少于6个字符！");
        $("#message").focus();
        return;
    }
    $("#send_mail").html("信息提交中...");
    $.ajax({
        url: "/tools/list_ajax.ashx?act=send_mail",
        dataType: "text",
        type: "post",
        data: $("#form1").serialize(),
        success: function (data) {
            var obj = eval('(' + data + ')');
            if (obj.status == 1) {
                $("#send_mail").html("发送您的信息");
                alert(obj.msg);
                return;
            }
            else {
                $("#send_mail").html("重新发送您的信息");
                alert(obj.msg);
                return;
            }
        }
    });
}