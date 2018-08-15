var clerkid = localStorage.getItem("clerkid");
var signature = "";
function wordStatic(input) {
    // 获取要显示已经输入字数文本框对象  
    let content = document.getElementById('num');
    if (content && input) {
        // 获取输入框输入内容长度并更新到界面  
        let value = input.value;
        // 将换行符不计算为单词数  
        value = value.replace(/\n|\r/gi, "");
        // 更新计数  
        content.innerText = value.length;
    }
}

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
    datas = getClerkPersonalityByClerkId(clerkid);
    signature = datas.personality.signature;
    //渲染数据
    $("#content").val(datas.personality.signature);
    $('#num').text(datas.personality.signature.length)
});
//点击提交按钮触发事件
$(document).on("click", "#showTooltips", function () {
    signature = $("#content").val();
    setClerkSignatureByClerkIdAndSignature(clerkid, signature);
    datas = getClerkPersonalityByClerkId(clerkid);
    signature = datas.personality.signature;
    //渲染数据
    $("#content").val(datas.personality.signature);
});