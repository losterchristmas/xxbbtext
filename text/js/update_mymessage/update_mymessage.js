//var custom_id = localStorage.getItem("lastname");
var clerkid = localStorage.getItem("clerkid");
var datas = 0;

$(function () {
    $('.showinformation').click(function () {
        $('.label_background').show();
    });
    $('.information_button').click(function () {
        $('.label_background').hide();
    })
});

//判断clerkid是否正确
function checkClerkId() {
    if (!localStorage.getItem("clerk_id") || localStorage.getItem("clerk_id") == "") {
        //  alert("no clerkid");
        return false;
    }
    this.clerkid = localStorage.getItem("clerk_id");
    return true;
}

//当页面加载完成后调用
$(document).ready(() => {
    checkClerkId();
    if (!checkClerkId()) {
        window.location.href = "error.html";
        return;
    }
    //调用接口获取数据
    getClerkInfoWithCorpInfoByClerkId(clerkid, function (datas) {
        console.log(datas);
        if (datas.errmsg == "ok") {
            //渲染数据
            //名称
            $("#remark_name").attr("placeholder", datas.clerk.name);
            //职位
            $("#position").attr("placeholder", datas.clerk.position);
            //电话
            //$("#binding_mobile").attr("placeholder",datas.clerk.binding_mobile);
            $("#binding_mobile").val(datas.clerk.binding_mobile);
            //头像
            $("#avatar").attr("src", datas.clerk.avatar);
            //微信
            $("#wechat").val(datas.clerk.wechat);
            //座机
            $("#telephone").val(datas.clerk.telephone);
            //邮箱 
            $("#email").val(datas.clerk.email);
            //选择地区
            $("#address").val(datas.clerk.address);
            //详细地址
            $("#corp_location").val(datas.corp.corp_location);
        }
        else {
            $.alert("数据加载失败");
        }
    });

});

$("#start").cityPicker({
    title: "选择出发地",
    onChange: function (picker, values, displayValues) {
        console.log(values, displayValues);
    }
});
// $("#end").cityPicker({
//     title: "选择目的地"
// });
// $("#home-city").cityPicker({
//     title: "选择目的地",
//     showDistrict: false,
//     onChange: function (picker, values, displayValues) {
//         console.log(values, displayValues);
//     }
// });
