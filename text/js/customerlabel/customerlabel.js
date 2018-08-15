document.write('<script src="js/allDatasport.js"></script>');


//定义变量*--------------------------------------------------
var tag = "";
var customid = localStorage.getItem("choose_custome");//读取localStorage客户客户ID
var clerkid = localStorage.getItem("clerkid");
var label = $('.label');
var i = 0;

//-----------------------------------------------------------



//定义方法*---------------------------------------------------

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
    current_index = 0;
    //调用接口获取数据
    let datas = getTagsOfCustomByCustomId(customid);
    //渲染数据
    for (let i = 0; i < datas.length; i++) {
        if (i >= 9) { break; }
        else {
            addItem(datas[i]);
            current_index++;
        }

    }
});

//增加用户行为前端标签元素
function addItem(object) {
    let data = object;
    i++;
    let j = i % 3;
    let s = '<div id="mode"  data-bind=' + data.tag + ' class="mode' + j + '"><a href="tag_add_kinds.html" class="mode' + j + '_a" style="font-size: 14px;">' + data.tag + '</a></div>';
    label.append(s);
    label.append(mode);
}

//点击标签名称跳转页面
$(document).on("click", "#mode", function (event) {
    tag = event.currentTarget.dataset.bind;
    //localStorage存储客户标签
    localStorage.setItem("tag", tag);
})

//增加用户行为前端用户元素
function addList(object) {
    let data = object;
    let s = '<a href ="chat.html"><div class = "tag_cus" data-bind =' + data.nickname + ' data-bind_cusID = ' + data.customId + '><img src=' + data.avatar_url + ' height="40px" width="40px" alt=""><p class="tag_cus_name" style="  font-size: 18px;">' + data.nickname + '</p></div></a>';
    $('.addList').append(s);
}

//实时监听input，value改变触发
function OnInput() {
    let name = $('#searchInput').val();
    let datas = getCustomersByClerkIdWithOffsetAndStep(clerkid, 0, 10);
    let ListCusmessage = [];
    $(".search_content").show();
    for (let i = 0; i < datas.length; i++) {
        let customId = datas[i].custom_id;
        let data = localstrongerDatas(customId);
        ListCusmessage.push(data);
    }
    let result = search(ListCusmessage, name);
    if (result == "") {
        $('.addList').empty();
        $(".search_content").show();
        $(".screen").hide();
    }
    else if (name == "") {
        $('.addList').empty();
        $(".search_content").show();
        $(".screen").hide();
    }
    else {
        $('.addList').empty();
        $(".search_content").hide();
        $(".screen").show();
        for (let j = 0; j < result.length; j++) {
            addList(result[j]);
        }
    }
}

//搜索判断，找到相同的返回1，没有返回0
function search(ListCusmessage, name) {
    ListCusmessage = ListCusmessage.filter((item) => {
        let reg = new RegExp(name);
        return reg.test(item.nickname);
    })
    return ListCusmessage;
}

//点击List跳转页面
$(document).on("click", ".tag_cus", function (event) {
    nickname = event.currentTarget.dataset.bind;
    choose_custome = event.currentTarget.dataset.bind_cusid;
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("choose_custome", choose_custome);
})