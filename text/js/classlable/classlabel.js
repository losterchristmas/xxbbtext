document.write('<script src="js/allDatasport.js"></script>');

//定义变量*---------------------------------------------------------------------
var other_datas = [];
var clerkid = localStorage.getItem("firstname");
var customid = localStorage.getItem("choose_custome");
var tags = [
    [//基本信息
        { tag_id: -1, type: 0, search_id: 0, content: '男', active: false },
        { tag_id: -1, type: 0, search_id: 1, content: '女', active: false },
        { tag_id: -1, type: 0, search_id: 2, content: '已婚', active: false },
        { tag_id: -1, type: 0, search_id: 3, content: '00后', active: false },
        { tag_id: -1, type: 0, search_id: 4, content: '90后', active: false },
        { tag_id: -1, type: 0, search_id: 5, content: '80后', active: false },
        { tag_id: -1, type: 0, search_id: 6, content: '70后', active: false },
        { tag_id: -1, type: 0, search_id: 7, content: '60后', active: false }
    ],
    [//关注点
        { tag_id: -1, type: 1, search_id: 0, content: '在意价格', active: false },
        { tag_id: -1, type: 1, search_id: 1, content: '在意质量', active: false },
        { tag_id: -1, type: 1, search_id: 2, content: '在意服务', active: false }
    ],
    [//级别
        { tag_id: -1, type: 2, search_id: 0, content: '一般客户', active: false },
        { tag_id: -1, type: 2, search_id: 1, content: '重要客户', active: false },
        { tag_id: -1, type: 2, search_id: 2, content: '核心客户', active: false },
        { tag_id: -1, type: 2, search_id: 3, content: '潜在客户', active: false },
        { tag_id: -1, type: 2, search_id: 4, content: '意向客户', active: false },
        { tag_id: -1, type: 2, search_id: 5, content: '流失客户', active: false },
    ],
    [//类型
        { tag_id: -1, type: 3, search_id: 0, content: '客户', active: false },
        { tag_id: -1, type: 3, search_id: 1, content: '渠道商', active: false },
        { tag_id: -1, type: 3, search_id: 2, content: '供应商', active: false },
        { tag_id: -1, type: 3, search_id: 3, content: '合作伙伴', active: false },
        { tag_id: -1, type: 3, search_id: 4, content: '直销客户', active: false },
        { tag_id: -1, type: 3, search_id: 5, content: '老客户推荐', active: false },
    ],
    [//跟进状态
        { tag_id: -1, type: 4, search_id: 0, content: '已发资料', active: false },
        { tag_id: -1, type: 4, search_id: 1, content: '已发报价', active: false },
        { tag_id: -1, type: 4, search_id: 2, content: '已拜访', active: false },
        { tag_id: -1, type: 4, search_id: 3, content: '价格谈判', active: false },
        { tag_id: -1, type: 4, search_id: 4, content: '合同审核', active: false },
        { tag_id: -1, type: 4, search_id: 5, content: '已签合同', active: false },
    ],
    [//成交状态
        { tag_id: -1, type: 5, search_id: 0, content: '已成交', active: false },
        { tag_id: -1, type: 5, search_id: 1, content: '近期可成交', active: false },
        { tag_id: -1, type: 5, search_id: 2, content: '需长期跟进', active: false },
        { tag_id: -1, type: 5, search_id: 3, content: '流失', active: false },

    ],
    [//付款状态
        { tag_id: -1, type: 6, search_id: 0, content: '已付全款', active: false },
        { tag_id: -1, type: 6, search_id: 1, content: '已支付首付款', active: false },
        { tag_id: -1, type: 6, search_id: 2, content: '已支付尾款', active: false },
        { tag_id: -1, type: 6, search_id: 3, content: '未付全款', active: false },
        { tag_id: -1, type: 6, search_id: 4, content: '未支付首付款', active: false },
        { tag_id: -1, type: 6, search_id: 5, content: '未支付尾款', active: false },
    ],
];
//-----------------------------------------------------------



//定义方法*----------------------------------------------------
//触发删除过增加事件
function tagOnClick(e) {
    let jqObject = $(e);
    let type = jqObject.attr('bind-type');
    let active = jqObject.attr('bind-active');
    let tagid = jqObject.attr('bind-tagid');

    if (active == "false") {
        jqObject.removeClass("tag_p");
        switch (type) {
            case '0':
                addData(jqObject, 0)
                break;
            case '1':
                addData(jqObject, 1)
                break;
            case '2':
                addData(jqObject, 2)
                break;
            case '3':
                addData(jqObject, 3)
                break;
            case '4':
                addData(jqObject, 4)
                break;
            case '5':
                addData(jqObject, 5)
                break;
            case '6':
                addData(jqObject, 6)
                break;
            default:
                addData(jqObject, 7)
                break;
        }
    }
    else {
        switch (type) {
            case '0':
                deleData(jqObject, 0)
                break;
            case '1':
                deleData(jqObject, 1)
                break;
            case '2':
                deleData(jqObject, 2)
                break;
            case '3':
                deleData(jqObject, 3)
                break;
            case '4':
                deleData(jqObject, 4)
                break;
            case '5':
                deleData(jqObject, 5)
                break;
            case '6':
                deleData(jqObject, 6)
                break;
            default: deleData(jqObject, 7)
                break;
        }
    }
}

//获得标签id
function addcusId(customid, tagName) {
    let cusId = 0;
    let cusIds = getTagsOfCustomByCustomId(customid);
    console.log(cusIds);
    console.log(cusIds.length);
    for (let i = 0; i < cusIds.length; i++) {
        if (cusIds[i].tag == tagName)
            cusId = cusIds[i].id
        break;
    }
    return cusId;
}

//增加标签
function addData(jqObject, i) {
    let tag = jqObject.context.innerHTML;
    let rs = addTagsOfCustomByCustomIdAndClerkId(customid, clerkid, tag, 0, i);
    if (rs.errcode == 0) {
        jqObject.attr('bind-active', true);
        tagid = jqObject.attr('bind-tagid', rs.tag.id);
        jqObject.addClass('type' + i + '');
        $.toast("标签已经增加!", 500);
    }
    else { $.alert("增加失败") }
}

//加入数据如标签集合中
function plan() {
    //获取客户标签分组
    let datas = getClerkTagGroupsByClerkId(clerkid);
    let class_other_datas;//所有自定义标签值
    let tag = [];
    //选出自定义数据content值
    for (let i = 0; i < datas.length; i++) {
        class_other_datas = choose_other_label(datas[i], i);
    }
    //把content值加入数组tag中
    for (let i = 0; i < class_other_datas.length; i++) {
        let other_data = { tag_id: -1, type: 7, search_id: i, content: class_other_datas[i], active: false };
        tag.push(other_data);
    }
    //把tag存入tags中
    tags.push(tag);
    return tags;
}

//修正数据
function fixData(data1, data2) {
    // console.log(data1);
    // console.log(data2);
    for (let k = 0; k < data2.length; k++) {
        //获取客户标签
        let customTag = data2[k].tag;
        let isOver = false;
        for (let i = 0; i < data1.length; i++) {
            if (isOver) {
                break;
            }
            for (let j = 0; j < data1[i].length; j++) {
                let element = data1[i][j];
                if (customTag == element.content) {
                    element.active = true;
                    element.tag_id = data2[k].id;
                    isOver = true;
                    break;
                }
            }
        }
    }
    // console.log(data1)
    return data1;
}

//接收datas.groups所有数据从中选择出自定义数据tag
function choose_other_label(obj, i) {
    let data = obj;
    if (data.is_custom == 1) {
        other_datas.push(data.tag);
        // var other_datas = [{ tag_id: -1, type: 3, search_id: i, content:data.tag}];
    }
    return other_datas;
}

//渲染
function addItem(object) {
    let typeContent = "#type0";
    let classString = '';
    switch (object.type) {
        case 0: typeContent = "#type0"; classString = 'class="type0"'; break;
        case 1: typeContent = "#type1"; classString = 'class="type1"'; break;
        case 2: typeContent = "#type2"; classString = 'class="type2"'; break;
        case 3: typeContent = "#type3"; classString = 'class="type3"'; break;
        case 4: typeContent = "#type4"; classString = 'class="type4"'; break;
        case 5: typeContent = "#type5"; classString = 'class="type5"'; break;
        case 6: typeContent = "#type6"; classString = 'class="type6"'; break;
        case 7: typeContent = "#type7"; classString = 'class="type7"'; break;
        default: break;
    }
    let addString = '';
    if (object.active == true) {
        addString = '' + classString + ' ';
    }
    let newTag = '<p ' + addString;//添加样式
    newTag += 'class="tag_p"';
    newTag += ' bind-tagid=' + object.tag_id;
    newTag += ' bind-type=' + object.type;
    newTag += ' bind-active=' + object.active;
    newTag += ' onclick="tagOnClick(this)"';
    newTag += '>';//闭合标签属性
    newTag += object.content;//添加标签
    newTag += '</p>';
    $(typeContent).append(newTag);
}

//删除标签
function deleData(jqObject, i) {
    //let type = jqObject.attr('bind-type');
    //let active = jqObject.attr('bind-active');
    let tagid = jqObject.attr('bind-tagid');
    jqObject.removeClass("type7");
    // let tag = jqObject.context.innerHTML;
    let rs = deleteTagOfCustomByCustomIdAndTagId(customid, tagid);
    if (rs.errcode == 0) {
        jqObject.attr('bind-active', false);
        tagid = jqObject.attr('bind-tagid', -1);
        jqObject.removeClass('type' + i + '');
        jqObject.addClass("tag_p");
        $.toast("标签已经删除!", 500);
    }
    else {
        $.alert("删除失败");
    }
}


$(document).on("click", "#show-prompt", function () {
    $.prompt({
        text: "名字不能超过6个字符，不得出现不和谐文字",
        title: "输入姓名",
        onOK: function (text) {
            //判断是否已有该标签
            let tagName = text;
            let isHave = false;
            let isover = false;
            for (let i = 0; i < tags.length; i++) {
                if (isover) {
                    break;
                }
                for (let j = 0; j < tags[i].length; j++)
                    if (tagName == tags[i][j].content) {
                        isHave = true;
                        isover = true;
                        break;
                    }
            }
            if (isHave == false) {
                let rs = addTagsOfCustomByCustomIdAndClerkId(customid, clerkid, tagName, 1, 7);
                console.log(rs)
                let object = new Object();
                object.active = true;
                object.content = tagName;
                object.tag_id = addcusId(customid, tagName);
                object.type = 7;
                addItem(object);
            }
            else {
                $.alert("已有该标签");
            }
        },
        onCancel: function () {
            console.log("取消了");
        },
        input: ''
    });
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

//界面加载完成后调用
$(document).ready(() => {
    checkClerkId();
    if (!checkClerkId()) {
        window.location.href = "error.html";
        return;
    }
    let allTags = plan();
    $('.label_background').hide();
    //获取客户标签
    let customeActiveTags = getTagsOfCustomByCustomId(customid);
    let fixedData = fixData(allTags, customeActiveTags);
    for (let i = 0; i < fixedData.length; i++) {
        for (let j = 0; j < fixedData[i].length; j++) {
            addItem(fixedData[i][j]);
        }
    }
})

