document.write('<script src="js/allDatasport.js"></script>');
document.write('<script src="js/common/time-picker.js"></script>');
document.write('<script src="js/common/util.js"></script>');
document.write('<script src="js/common/action-detail.js"></script>');


//定义变量*----------------------------------------------------
var current_index = 0;//数组下标
var mainer = $('.main');
var query_base_time = 0;//初始化时间戳
var customid = 1;
var clerkid;
var lasttime = -1;
var timespli = 2 * 60;//规定的时间间隔
var customDatas = [];
var loading = false;

//-----------------------------------------------------------



//定义方法*----------------------------------------------------
//增加用户行为前端元素
function addItem(object) {
    let data = object;
    let timeStr = '';
    let thistime = data.create_time//当前时间
    let timespace = Math.abs(thistime - lasttime); //时间间隔
    // let time2Day = timespace / 60 / 60 / 24;//时间间隔转化为天数
    //时间间隔大于规定的时间间隔，输出日期


    if (!isSoonDay(lasttime, thistime) || timespace >= timespli) {
        timeStr = '<p class="time">' + timestampToTime(data.create_time) + '</p>'
    }
    lasttime = thistime;
    //转译出客户行为;
    let dataMessage = creatActionDetail(data.operation, data.module, data.item, data.nickname);
    //console.log(rs);
    let s = '<div>' + timeStr + '<a href="chat.html"><div class="mainer" data-bind=' + data.custom_id + ' data-yonghu=' + data.clerk_id + ' data-remark_name=' + data.nickname + '><div class="mainer_img"><img src="' + data.avatar_url + '" height="50px" width="50px" alt=""></div><div class="mainer_p"><p>' + dataMessage + '</p></div><div class="mainer_right"><img src="img/right.png" height="20px" width="20px" alt=""></div></div></a></div>';
    mainer.append(s);
}

function setTestClerkId() {
    localStorage.setItem('clerk_id', 'clerk5afa82135e349');
}

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
    setTestClerkId()
    checkClerkId();
    if (!checkClerkId()) {
        window.location.href = "error.html";
        return;
    }
    current_index = 0;
    query_base_time = Date.parse(new Date());//获取当前时间戳
    //调用接口获取客户行为数据
    getCustomActionListsByClerkIdWithOffsetAndStepAndTime(this.clerkid, 0, 6, query_base_time, function (datas) {
        datas = datas.list

        for (let i = 0; i < datas.length; i++) {
            // let cus_id = datas[i];
            let custommssage = localstrongerDatas(datas[i].custom_id);
            datas[i].nickname = custommssage.nickname;
            datas[i].avatar_url = custommssage.avatar_url;
            addItem(datas[i]);
            current_index++;
        }
    });
});

//绑定点击事件
$(document).on("click", ".mainer", function (e) {
    let bind = e.currentTarget.dataset.bind;
    let remark_name = e.currentTarget.dataset.remark_name;
    let yonghu = e.currentTarget.dataset.yonghu;
    localStorage.setItem("choose_custome", bind);//存储客户choose_custome到localstorage里
    localStorage.setItem("clerkid", yonghu);//存储客户clerkid到localstorage里
    localStorage.setItem("nickname", remark_name);//存储客户nickname到localstorage里
})

//上拉增加  
$(".content").infinite().on("infinite", () => {
    if (loading) return;
    loading = true;
    setTimeout(function () {
        //调用接口获取数据
        getCustomActionListsByClerkIdWithOffsetAndStepAndTime(clerkid, current_index, 3, query_base_time, function (datas) {
            datas = datas.list
            if (datas.length <= 0) {
                $("#loadmore").html("没有更多数据")
                $('.weui-loading').hide()
                return;
            }

            //渲染数据
            for (let i = 0; i < datas.length; i++) {
                let cus_id = datas[i].custom_id;
                let cus_id_datas = localstrongerDatas(cus_id);
                // let create_time = timestampToTime(datas[i].create_time)
                datas[i].nickname = cus_id_datas.nickname;
                datas[i].avatar_url = cus_id_datas.avatar_url;
                addItem(datas[i]);
                current_index++;
            }
        });
        loading = false;
    }, 2000);
});

//下拉刷新
$(".content").pullToRefresh(() => {
    setTimeout(function () {
        $(".content").pullToRefreshDone();
        //清空列表
        mainer.empty();
        current_index = 0;
        query_base_time = Date.parse(new Date());
        //调用接口获取数据
        getCustomActionListsByClerkIdWithOffsetAndStepAndTime(clerkid, 0, 6, query_base_time, function (datas) {
            //渲染数据
            datas = datas.list;
            lasttime = -1;
            for (let i = 0; i < datas.length; i++) {
                let cus_id = datas[i].custom_id;
                let cus_id_datas = localstrongerDatas(cus_id);
                //let create_time = timestampToTime(datas[i].create_time)
                datas[i].nickname = cus_id_datas.nickname;
                datas[i].avatar_url = cus_id_datas.avatar_url;
                addItem(datas[i]);
                current_index++;
            }
        });
    }, 500);
});
