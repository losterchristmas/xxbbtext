document.write('<script src="js/allDatasport.js"></script>');

//定义变量*---------------------------------------------------
var clerkid = localStorage.getItem("clerkid");
var mainer = $(".mainer");
var customsid = [];

//-----------------------------------------------------------



//定义方法*----------------------------------------------------
//添加成员信息
function addItem(object, customId) {
    let data = object;
    let s = '<div class="borde_old" data-bind = ' + customId + '  data-active = "false" style="border-radius: 5px;"><img style="display: inline-block;transform: translate(0,16%)" src="' + data.avatar_url + '" alt="" width="40px" height="40px"><p style="display: inline-block;transform: translate(0,-14%);margin-left: 5%">' + data.nickname + '</p></div>';
    mainer.append(s);
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

//页面加载完后运行
$(document).ready(function () {
    checkClerkId();
    if (!checkClerkId()) {
        window.location.href = "error.html";
        return;
    }
    $("#add_kinds").click(function () {
        $("#add_kinds").off('click');
        let allCustom = getCustomersByClerkIdWithOffsetAndStep(clerkid, 0, 10);
        for (let i = 0; i < allCustom.length; i++) {
            let customId = allCustom[i].custom_id;
            let customMessage = getCustomInfomationByCustomId(customId);
            let wechat = customMessage.wechat;
            addItem(wechat, customId);
        }
    })
})

//获取标签名称分组
function tagNameGroups() {
    let tagGroups = getClerkTagGroupsByClerkId(clerkid);
    let tagNames = [];
    for (let i = 0; i < tagGroups.length; i++) {
        let tagName = tagGroups[i].tag;
        tagNames.push(tagName)
    }
    return tagNames;
}

//选择添加成员
$(document).on("click", ".borde_old", function (e) {
    let object = $(e);
    let num = 0;
    object.id = e.currentTarget.dataset.bind;
    object.name = e.currentTarget.innerText;
    object.active = e.currentTarget.dataset.active;
    let cus_id = object.id;
    //let name = object.name;
    //let active = e.currentTarget.dataset.active;
    if (object.active == "false") {
        e.currentTarget.dataset.active = "true";
        $(this).addClass("borde_new");
        customsid.push(cus_id);
        num = customsid.length;
    }
    else if (object.active == "true") {
        e.currentTarget.dataset.active = "false";
        $(this).removeClass("borde_new");
        customsid.splice($.inArray(cus_id, customsid), 1);
        num = customsid.length;
    }
    $("#num").text(num);
})

//点击保存按钮保存数据
$("#submit").on("click", function () {

    let tagNamesGroupS = tagNameGroups();
    let tag = $("#tag_add").val();
    if (tag == "") {
        $.alert("请输入标签名")
    }
    else if (tag.length > 6) {
        $.alert("标签名超过了长度")
    }
    else {
        for (let i = 0; i < tagNamesGroupS.length; i++) {
            if (tag == tagNamesGroupS[i]) {
                $.alert("标签名重复");
                break;
            }
        }
        for (let i = 0; i < customsid.length; i++) {
            let rs = addTagsOfCustomByCustomIdAndClerkId(customsid[i], clerkid, tag, 1, 7)
            $.toast("标签已经保存!", 500);
            $("#submit").off('click');
        }
    }
})