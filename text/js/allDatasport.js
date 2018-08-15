var localhost = 'http://api.lenjoy.me/tp5/public/api/card_radar_service/';

//获取指定客户信息
function getCustomInfomationByCustomId(cus_id) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'getCustomInfomationByCustomId',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            customid: cus_id,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas;
        }
    });
    return returnData;
}

//分页获取客户行为
function getCustomActionListsByClerkIdWithOffsetAndStepAndTime(clerkid, offset, step, time, callback) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'getCustomActionListsByClerkIdWithOffsetAndStepAndTime',
        async: true,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
            offset: offset,
            step: step,
            time: time,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            callback && callback(datas)
        }
    });
}

//分页获取指定用户行为
function getCustomActionListByClerkIdAndCustomIdWithOffsetAndStepAndTime(clerkid, customid, offset, step, time) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'getCustomActionListByClerkIdAndCustomIdWithOffsetAndStepAndTime',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            // clerkid: "clerk5afa82135e349",
            clerkid: clerkid,
            customid: customid,
            offset: offset,
            step: step,
            time: time,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas.list;
        }
    });
    return returnData;
}

//获取全部ClerkId的聊天会话列表
function getCustomersByClerkIdWithOffsetAndStep(clerkid, offset, step) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'getCustomersByClerkIdWithOffsetAndStep',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
            offset: offset,
            step: step,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas.list;
        }
    });
    return returnData;
}

//获取指定ClerkId的聊天会话列表
function getClerkInfoWithCorpInfoByClerkId(clerkid, callback) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'getClerkInfoWithCorpInfoByClerkId',
        async: true,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            callback && callback(datas);
        }
    });
}

//通过接口获取客户标签
function getTagsOfCustomByCustomId(customid) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'getTagsOfCustomByCustomId',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            customid: customid,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas.list;
        }
    });
    return returnData;
}

//通过接口上传客户成交日期
function setCustomTurnoverDate(customid, date_ts) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'setCustomTurnoverDate',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            customid: customid,
            date_ts: date_ts,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas;
        }
    });
    return returnData;
}

//通过接口上传客户成交率
function setCustomTurnoverProbability(customid, probability) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'setCustomTurnoverProbability',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            customid: customid,
            probability: probability,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas;
        }
    });
    return returnData;
}

//分组获取客户标签
function getClerkTagGroupsByClerkId(clerkid) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'getClerkTagGroupsByClerkId',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas.groups;
        }
    });
    return returnData;
}

//通过接口提交客户标签
function addTagsOfCustomByCustomIdAndClerkId(customid, clerkid, tag, custom, type) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'addTagsOfCustomByCustomIdAndClerkId',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            customid: customid,
            clerkid: clerkid,
            tag: tag,
            custom: custom,
            type: type,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas;
        }
    });
    return returnData;
}

//通过接口删除客户标签
function deleteTagOfCustomByCustomIdAndTagId(customid, tagid) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'deleteTagOfCustomByCustomIdAndTagId',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            customid: customid,
            tagid: tagid,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas;
        }
    });
    return returnData;
}

//通过客户ID获取指定业务员标签
function getClerkTagsByClerkId(clerkid, callback) {
    var returnData = [];
    $.ajax({
        url: '' + localhost + 'getClerkTagsByClerkId',
        async: true,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            callback && callback(datas)
        }
    });

}

//增加业务员标签
function addClerkTagByClerkIdAndTag(clerkid, tag) {
    var returnData = [];

    $.ajax({
        url: '' + localhost + 'addClerkTagByClerkIdAndTag',
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
            tag: tag,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas;
        }
    });
    return returnData;
}


//删除业务员标签
function deleteClerkTagByClerkIdAndTagId(clerkid, tagid, callback) {
    var returnData = [];

    $.ajax({
        url: '' + localhost + 'deleteClerkTagByClerkIdAndTagId',
        async: true,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
            tagid: tagid,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            callback && callback(datas);
        }
    });

}

//设置个性签名
function getClerkPersonalityByClerkId(clerkid) {
    let returnData = [];
    $.ajax({
        url: "http://api.lenjoy.me/tp5/public/api/card_radar_service/getClerkPersonalityByClerkId",
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
            signature: signature,
        },
        error: function () {
            return returnData;
        },
        success: function (datas) {
            returnData = datas;
        }
    });
    console.log(returnData);
    return returnData;
}

//提交个性签名
function setClerkSignatureByClerkIdAndSignature(clerkid, signature) {
    let returnData = [];
    $.ajax({
        url: "http://api.lenjoy.me/tp5/public/api/card_radar_service/setClerkSignatureByClerkIdAndSignature",
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            clerkid: clerkid,
            signature: signature,
        },
        error: function () {
            return returnData;
            $.alert("信息保存失败", "保存失败");
        },
        success: function (datas) {
            returnData = datas;
            $.alert("信息保存成功", "保存成功");
        }
    });
    console.log(returnData);
    return returnData;
}
