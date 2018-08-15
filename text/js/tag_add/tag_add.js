document.write('<script src="js/allDatasport.js"></script>');
document.write('<script src="js/common/util.js"></script>');


//定义变量*--------------------------------------------------
var tag = "";
var clerkid = localStorage.getItem("clerkid");//读取localStorage客户客户ID
var nickname = "";
var NickName = localStorage.setItem("nickname", nickname);
var customid = localStorage.getItem("choose_custome");
var i = 0;
var main = $(".main");
var tag_ID = 0;

//-----------------------------------------------------------



//定义方法*----------------------------------------------------
//增加用户行为前端元素
function addItem(object) {
    let data = object;
    let s = '<a href="tag_add_kinds.html"><div id="mode" data-bind=' + data.tagName + ' data-bindId=' + data.cus + ' data-bindnickname=' + data.nickname + '><span style="font-size:18px;">' + data.tagName + '(' + data.count + ')</span><p class="cus_name">' + data.info + '</p></div></a>';
    main.append(s);
}

function list(arr) {
    let obj = new Object();
    obj.tagName = arr.tag;
    obj.count = arr.count;
    customs = arr.list;
    //存储客户ID
    let str = '';//用户名称
    let str_cus = '';//用户ID
    for (let i = 0; i < arr.count; i++) {
        let data = localstrongerDatas(customs[i].custom_id);
        name = data.nickname;
        str += name + ",";
        str_cus += customs[i].custom_id
            + ",";
    }
    str_cus = str_cus.substring(0, str_cus.length - 1);
    str = str.substring(0, str.length - 1);
    obj.cus = str_cus;
    obj.info = str;
    obj.nickname = str;
    addItem(obj);
}

$(document).on("click", "#mode", function (event) {
    tag = event.currentTarget.dataset.bind;
    tag_ID = event.currentTarget.dataset.bindid;
    nickname = event.currentTarget.dataset.bindnickname;

    var array_tag_ID = [];
    array_tag_ID = tag_ID.split(",");
    //localStorage存储客户标签
    localStorage.setItem("tag", tag);
    //localStorage存储客户ID
    localStorage.setItem("tag_ID", array_tag_ID);
    //localStorage存储客户nickname
    localStorage.setItem("nickname", nickname);
})

//判断clerkid是否正确
function checkClerkId() {
    if (!localStorage.getItem("clerk_id") || localStorage.getItem("clerk_id") == "") {
        //  alert("no clerkid");
        return false;
    }
    this.clerkid = localStorage.getItem("clerk_id");
    return true;
}

//界面加载玩之后执行
$(document).ready(() => {
    checkClerkId();
    if (!checkClerkId()) {
        window.location.href = "error.html";
        return;
    }
    //调用接口获取标签分组
    let datas = getClerkTagGroupsByClerkId(clerkid);
    let group_list = datas;

    //渲染数据
    for (i = 0; i < group_list.length; i++) {
        list(group_list[i]);

    }
});
