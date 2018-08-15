document.write('<script src="js/allDatasport.js"></script>');
document.write('<script src="js/common/time-picker.js"></script>');
document.write('<script src="js/common/util.js"></script>');

//定义变量*---------------------------------------------------
var nickname = localStorage.getItem("nickname");//读取用户ID
var hander_block = $("#hander_block");
var hander_block_img = $("#hander_block_img")
var hander_label = $('.hander_label');
var current_index = 0;
var mainer = $('#main');
var query_base_time = 0;
var time;
var choose_customid = localStorage.getItem("choose_custome");
var customid = localStorage.getItem("choose_custome");//读取localStorage存储客户ID
var clerkid = localStorage.getItem("firstname");//读取localStorage用户客户ID
var bind_turnover = localStorage.getItem("bind_turnover");
var lasttime = -1;
var timespli = 6 * 60 * 60;
//-----------------------------------------------------------



//定义方法*----------------------------------------------------

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
    current_index = 0; //定义下标
    query_base_time = Date.parse(new Date());
    //调用接口获取数据
    let datas = getCustomActionListByClerkIdAndCustomIdWithOffsetAndStepAndTime(clerkid, customid, 0, 6, query_base_time);
    let cus_datas = getTagsOfCustomByCustomId(customid);
    let custmoData = getCustomInfomationByCustomId(customid);

    //筛选字符串日期
    let timestring = timestampToTime(custmoData.custom.turnover_date)
    let timeyear = timestring.substr(0, 4);
    let timemooth = timestring.substr(5, 2);
    let timeday = timestring.substr(8, 2);
    $("#time3").html(timeyear);
    $("#time2").html(timemooth + "/" + timeday);

    hander_block.html(nickname);
    hander_block_img.append('<img src=' + custmoData.wechat.avatar_url + ' width="70px" height="80px"  style="margin: 15% 10% 15% 10%;border-radius:10px; "  alt="">')
    //读取成功率
    let turnover_probability = custmoData.custom.turnover_probability;
    $('#turnover_probability').html(turnover_probability);

    let hander_content = '<a href="#"><p id = "p0">添加标签</p></a><a href="#"><p id = "p1">添加标签</p></a><a href="#"><p id = "p2">添加标签</p></a><div><a href="classlabel.html"><img src="img/Settings.png" class="Settings_img" height="20px " width="20px" alt=""></a></div>';
    hander_label.append(hander_content);

    for (let i = 0; i < cus_datas.length; i++) {
        $('#p' + i + '').html(cus_datas[i].tag);
    }

    //渲染数据
    for (let i = 0; i < datas.length; i++) {
        let cus_id = datas[i].custom_id;
        let custommssage = localstrongerDatas(cus_id);
        datas[i].nickname = custommssage.nickname;
        datas[i].avatar_url = custommssage.avatar_url;
        addItem(datas[i]);
        current_index++;
    }
});

//增加用户行为前端元素
function addItem(object) {
    let data = object;
    let timeStr = '';
    let thistime = data.create_time
    //时间间隔
    let timespace = Math.abs(thistime - lasttime);
    // let time2Day = timespace / 60 / 60 / 24;
    if (!isSoonDay(lasttime, thistime) || timespace >= timespli) {
        timeStr = '<p class="time">' + timestampToTime(data.create_time) + '</p>'
    }
    lasttime = thistime;
    let s = '<div>' + timeStr + '<div class="mainer" data-bind=' + data.custom_id + ' data-yonghu=' + data.clerk_id + ' data-remark_name=' + data.nickname + '><div class="mainer_img"><img src="' + data.avatar_url + '" height="50px" width="50px" alt=""></div><div class="mainer_p"><p>' + data.nickname + data.operation + "你的" + data.item + "," + data.details + '</p></div><div class="mainer_right"><img src="img/right.png" height="20px" width="20px" alt=""></div></div></div>';
    mainer.append(s);
}

//时间表单
$("#time2").datetimePicker({
    times: function () {
    },
    onChange: function (picker, values, displayValues) {
        //    console.log(values);
        time = values;
        $("#time3").html(values[0]);
        $("#time2").html(values[1] + "/" + values[2]);
    },
});
//提交成交日期
$(document).on('click', ".picker-button", function () {
    let s = '"' + time[0] + '-' + time[1] + '-' + time[2] + '"';
    let timestamp = Date.parse(new Date(s));
    timestamp = timestamp / 1000;
    setCustomTurnoverDate(customid, timestamp);
})
//时间表单
$("#time2").datetimePicker({
    times: function () {
    },
    onChange: function (picker, values, displayValues) {
        time = values;
        $("#time3").html(values[0]);
        $("#time2").html(values[1] + "/" + values[2]);
    },
});

//提交成功率
$(document).on("click", "#show-prompt", function () {
    $.prompt({
        text: "只能输入数字",
        title: "输入成交率",
        onOK: function (text) {
            if (!isNaN(text)) {
                let num = text;
                if (num <= 100 && num >= 0) {
                    setCustomTurnoverProbability(customid, num);
                    num = Math.abs(num);
                    $("#turnover_probability").html(num);
                }
                else {
                    $.alert("概率为小于100的正数");
                }
            } else {
                $.alert("请输入纯数字");
            }
        },
        onCancel: function () {
        },
        input: ''
    });
});

//上拉增加
var loading = false;
$('.main').infinite().on("infinite", () => {
    if (loading) return;
    loading = true;
    setTimeout(function () {
        //调用接口获取数据
        let datas = getCustomActionListByClerkIdAndCustomIdWithOffsetAndStepAndTime(clerkid, customid, 0, 6, query_base_time);
        let length = datas.length;
        if (length <= 0) {
            $("#loadmore").html("没有更多数据");
            $('.weui-loading').hide();
            return;
        }
        //渲染数据
        for (let i = 0; i < datas.length; i++) {
            let cus_id = datas[i].custom_id;
            let cus_id_datas = localstrongerDatas(cus_id);
            timestampToTime(datas[i].create_time);
            datas[i].nickname = cus_id_datas.nickname;
            datas[i].avatar_url = cus_id_datas.avatar_url;
            addItem(datas[i]);
            current_index++;
        }
        loading = false;
    }, 2000);
});

//下拉刷新
$(".main").pullToRefresh(() => {
    setTimeout(function () {
        $(".main").pullToRefreshDone();
        //清空列表
        mainer.empty();
        current_index = 0;
        query_base_time = Date.parse(new Date());
        //调用接口获取数据
        let datas = getCustomActionListByClerkIdAndCustomIdWithOffsetAndStepAndTime(clerkid, customid, 0, 6, query_base_time);
        //渲染数据
        for (let i = 0; i < datas.length; i++) {
            let cus_id = datas[i].custom_id;
            let cus_id_datas = localstrongerDatas(cus_id);
            timestampToTime(datas[i].create_time)
            datas[i].nickname = cus_id_datas.nickname;
            datas[i].avatar_url = cus_id_datas.avatar_url;
            addItem(datas[i]);
            current_index++;
            console.log(datas[i]);
        }
    }, 2000);
});