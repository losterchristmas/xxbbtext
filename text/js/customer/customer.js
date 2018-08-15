document.write('<script src="js/allDatasport.js"></script>');

//定义变量*--------------------------------------------------------
var head = $('.head');
var mainer = $('.main');
var clerkid = localStorage.getItem("clerkid");//读取localStorage用户客户ID
var customDatas = [];//存储所有客户消息
//-----------------------------------------------------------



//定义方法*---------------------------------------------------
//增加用户行为前端元素
function addItem(object) {
    let data = object;
    let s = '<a href="chat.html"><div class="content" data-bind=' + data.nickname + ' data-bind_customID=' + data.custom_id + ' span data-bind_turnover=' + data.turnover_probability + '><div class="content_1"><img src="' + data.img + '" alt=""></div><div class="content_2"><p class="content_name">' + data.nickname + '</p><p class="content_message_left content_block"><span>' + data.last_time + '</span></p><p class="content_message content_block content_left">来源：<span>' + data.concern_way + '</span></p></div><div class="content_right"><p class="content_message" style="color: black">预计成交率：' + data.turnover_probability + '%</span></p></div></div></a>';
    mainer.append(s);
}

//点击预计成交率触发
$(document).on("click", '.Turnover_rate', function () {
    $('.label_background').toggle();
    $('.label_add').toggle();
})

//点击遮罩隐藏
$(document).on("click", ".label_background", function () {
    $('.label_background').hide();
    $('.label_add').hide();
})

//点击标签触发事件，替换名称
$(document).on("click", ".choose_p", function (event) {
    console.log(event);

    $(this).addClass("active");
    $(this).parent().siblings().children().removeClass('active');
    $('.label_background').toggle();
    $('.label_add').toggle();
    $('.log').html(event.target.textContent);
});

//用户点击客户列表触发事件跳转页面
$(document).on("click", ".content", function (event) {
    let custom_id = event.currentTarget.dataset.bind_customid;
    let custome = event.currentTarget.dataset.bind;
    // let bind_turnover = event.currentTarget.dataset.bind_turnover;
    //localStorage存储用户ID
    localStorage.setItem("choose_custome", custom_id);
    localStorage.setItem("nickname", custome);
})

//用户点击扫码触发
$(document).on("click", "#choose_saoma", function () {
    $(".main").empty();
    let rsDatas = Scavenging(customDatas);//筛选转发数据
    let sort = ComparisonData(rsDatas);//大小排序
    for (let i = 0; i < sort.length; i++) {
        addItem(sort[i]);
    }
})

//用户点击转发触发
$(document).on("click", "#choose_return", function () {
    $(".main").empty();
    let rsDatas = Forward(customDatas);//筛选转发数据
    let sort = ComparisonData(rsDatas);//大小排序
    for (let i = 0; i < sort.length; i++) {
        addItem(sort[i]);
    }
})

//筛选数据扫码
function Scavenging(customDatas) {
    let screenData = [];
    for (let i = 0; i < customDatas.length; i++) {
        if (customDatas[i].concern_way == "扫码") {
            screenData.push(customDatas[i]);
        }
    }
    return screenData;
}

//筛选数据转发
function Forward(customDatas) {
    let screenData = [];
    for (let i = 0; i < customDatas.length; i++) {
        if (customDatas[i].concern_way == "转发") {
            screenData.push(customDatas[i]);
        }
    }
    return screenData;
}

//用户点击预计成交率触发
$(document).on("click", "#choose_success", function () {
    $(".main").empty();
    let rsDatas = ComparisonData(customDatas);
    for (let i = 0; i < rsDatas.length; i++) {
        addItem(rsDatas[i]);
    }
})

//排序大小
function ComparisonData(customDatas) {
    let turnover_probability = [];
    for (let i = 0; i < customDatas.length; i++) {
        for (let j = 0; j < customDatas.length; j++) {
            if (customDatas[i].turnover_probability > customDatas[j].turnover_probability) {
                turnover_probability = customDatas[i];
                customDatas[i] = customDatas[j];
                customDatas[j] = turnover_probability;
            }
        }
    }
    return customDatas;
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
    current_index = 0;
    query_base_time = Date.parse(new Date());
    //调用接口获取客户列表
    let datas = getCustomersByClerkIdWithOffsetAndStep(clerkid, 0, 10);
    for (let i = 0; i < datas.length; i++) {
        let customData = getCustomInfomationByCustomId(datas[i].custom_id)
        let object = new Object;
        object.img = customData.wechat.avatar_url;
        object.nickname = customData.custom.remark_name;
        object.turnover_probability = customData.custom.turnover_probability;
        object.concern_way = customData.custom.concern_way;
        object.custom_id = customData.custom.custom_id;
        object.last_time = '';
        customDatas.push(object);
    }
    if (customDatas.length > 0) {
        let b = '<p>共<span>' + customDatas.length + '</span>名用户</p>'
        head.append(b);
        //渲染数据
        for (let i = 0; i < customDatas.length; i++)
            addItem(customDatas[i]);
    }

    else {
        $(".work").show();
    }
});
