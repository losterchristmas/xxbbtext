document.write('<script src="js/allDatasport.js"></script>');

var nickname = localStorage.getItem("nickname");
var customid = localStorage.getItem("choose_custome");


//判断clerkid是否正确
function checkClerkId() {
    if (!localStorage.getItem("clerk_id") || localStorage.getItem("clerk_id") == "") {
        //  alert("no clerkid");
        return false;
    }
    this.clerkid = localStorage.getItem("clerk_id");
    return true;
}

$(document).ready(function () {
    checkClerkId();
    if (!checkClerkId()) {
        window.location.href = "error.html";
        return;
    }
    let datas = getCustomInfomationByCustomId(customid);
    console.log(datas);

    if (datas.errmsg == 'ok') {
        $("#from").text('来自' + datas.custom.concern_way);
        $("#name").attr("value", datas.custom.remark_name);
        $("#phone").attr("value", datas.custom.phone);
        $("#email").attr("value", datas.custom.email);
        $("#company").attr("value", datas.custom.company);
        $("#position").attr("value", datas.custom.position);
        $("#location").attr("value", datas.custom.location);
    }
    else { $.alert("数据加载失败") }

})

//时间表单
$("#time2").datetimePicker({
    times: function () {
    },
    onChange: function (picker, values, displayValues) {
        console.log(values);
        $("#time3").html(values[0]);
        $("#time2").html(values[1] + "/" + values[2]);
    },
});