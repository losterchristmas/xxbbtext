document.write('<script src="js/allDatasport.js"></script>');
document.write('<script src="js/common/util.js"></script>');

//定义变量*----------------------------------------------------------
var num = 0;
//读取用户ID
var clerkid = localStorage.getItem("clerkid");
var mainer = $(".main");
let choose = $('.choose');
//读取localStorage客户ID
var tag = localStorage.getItem("tag");
//客户ID字符串
var choose_custome = "";
var customid = localStorage.getItem("tag_ID");
var customid_array = [];
var customsid = [];//所有标签的客户ID
customid_array = customid.split(",");
//-----------------------------------------------------------------------


//定义方法----------------------------------------------------------------
//增加用户行为前端元素
function addItem(object) {
    for (let i = 0; i < object.count; i++) {
        let data = object;
        // console.log(data)
        let s = '<a href ="chat.html"><div class="tag_cus" data-bind=' + data.name[i] + ' data-bind_cusID = ' + data.cus[i] + '><img src=' + data.img[i] + ' height="40px" width="40px" alt=""><p class="tag_cus_name" style="  font-size: 18px;">' + data.name[i] + '</p></div></a>';
        mainer.append(s);
    }
}

//添加成员信息
function addchooseItem(object, customId, active, b) {
    let data = object;
    //console.log(data)
    let s = '<div class="borde_old ' + b + '" id = "' + b + '"  data-bind = ' + customId + '  data-active = ' + active + ' style="border-radius: 5px;"><img style="display: inline-block;transform: translate(0,16%)" src="' + data.avatar_url + '" alt="" width="40px" height="40px"><p style="display: inline-block;transform: translate(0,-14%);margin-left: 5%">' + data.nickname + '</p></div>';
    choose.append(s);
}

//点击main触法事件
$(document).on("click", ".tag_cus", function (event) {
    nickname = event.currentTarget.dataset.bind;
    choose_custome = event.currentTarget.dataset.bind_cusid;
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("choose_custome", choose_custome);
})

//输入标签分组，渲染成员界面
function list(arr) {
    let cus_ID = [];
    let images = [];
    let nickname_array = [];
    let obj = new Object();
    obj.tagName = arr.tag;
    obj.count = arr.count;
    customs = arr.list;//标签分组中客户信息
    //存储客户ID
    let str = '';
    let str_cus = "";
    let imgs = "";

    //获取客户微信名称
    for (let i = 0; i < arr.count; i++) {
        let data = localstrongerDatas(customs[i].custom_id);
        let name = data.nickname;
        let img = data.avatar_url;
        imgs += img + ',';
        str += name + ",";
        str_cus += customs[i].custom_id + ",";
    }
    str_cus = str_cus.substring(0, str_cus.length - 1);
    cus_ID = str_cus.split(",");
    str = str.substring(0, str.length - 1);
    imgs = imgs.substring(0, imgs.length - 1);
    images = imgs.split(",");
    obj.cus = cus_ID;
    obj.info = str;
    nickname_array = obj.info.split(",");
    obj.name = nickname_array;
    num = obj.name.length;
    obj.img = images;
    addItem(obj);
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
    $("#tag_add").val(tag)
    //调用接口获取数据
    let datas = getClerkTagGroupsByClerkId(clerkid);
    //渲染数据
    for (let i = 0; i < datas.length; i++) {
        if (tag == datas[i].tag) {
            list(datas[i]);
        }
    }

    $("#num").text(num);
    //点击添加成员触发事件
    $("#add_kinds").click(function () {
        $("#add_kinds").off('click');
        $('.choose').addClass('choose_border');
        mainer.hide();
        let allCustom = getCustomersByClerkIdWithOffsetAndStep(clerkid, 0, 10);

        for (let i = 0; i < allCustom.length; i++) {
            let customId = allCustom[i].custom_id;
            let active = "false";
            let b = "addCustome";
            let customMessage = getCustomInfomationByCustomId(customId);

            for (let k = 0; k < datas.length; k++) {
                if (tag == datas[k].tag) {
                    type = datas[k].list[0].type;
                    for (let j = 0; j < datas[k].list.length; j++) {
                        if (customId == datas[k].list[j].custom_id) {
                            active = "true";
                            b = "borde_new";
                        }
                    }
                }
            }
            let wechat = customMessage.wechat;
            addchooseItem(wechat, customId, active, b);
        }
    })
});

//获取所有标签
$("#submit").on("click", function () {
    let tag = $("#tag_add").val();
    if (tag == "") {
        $.alert("请输入标签名");
    }
    else if (tag.length > 6) {
        $.alert("标签名超过了长度");
    }
    else {
        for (let i = 0; i < customsid.length; i++) {
            let rs = addTagsOfCustomByCustomIdAndClerkId(customsid[i], clerkid, tag, 1, 7);
            $.toast("标签已经保存!", 500);
            $("#submit").off('click');
        }
    }
})

//选择添加成员
$(document).on("click", "#addCustome", function (e) {
    //获取标签分组中选定的标签名下的长度
    let datas = getClerkTagGroupsByClerkId(clerkid);
    let object = $(e);
    let num = 0;
    object.id = e.currentTarget.dataset.bind;
    object.name = e.currentTarget.innerText;
    object.active = e.currentTarget.dataset.active;
    let cus_id = object.id;
    for (let i = 0; i < datas.length; i++) {
        if (tag == datas[i].tag) {
            num = datas[i].count;
        }
    }
    if (object.active == "false") {
        e.currentTarget.dataset.active = "true";
        $(this).addClass("borde_new");
        customsid.push(cus_id);;
        console.log(customsid);
        num += customsid.length;
    }
    else if (object.active == "true") {
        e.currentTarget.dataset.active = "false";
        $(this).removeClass("borde_new");
        customsid.splice($.inArray(cus_id, customsid), 1);
        console.log(customsid);
        num += customsid.length;
    }
    $("#num").text(num);
})