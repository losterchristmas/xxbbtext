
//变量*-----------------------------------------------------
//初始数据
var nicknameAndAvatar_urlDatas = [];

//-----------------------------------------------------------



//定义方法*----------------------------------------------------


//存储客户头像、名称
function localstrongerDatas(customId) {
    let num = 0;//定义数组下标
    let rsNicknameAndAvatar_urlDatas = [];//返回数据
    //如果初始数据为空，则把获取的数据放进customs，并且把customs直接存入nicknameAndAvatar_urlDatas，并返回该数据
    if (nicknameAndAvatar_urlDatas == '') {
        //调用接口获取客户信息
        let data = getCustomInfomationByCustomId(customId);
        //把获取的数据放进customs
        let customs = {
            customId: customId,
            avatar_url: data.wechat.avatar_url,
            nickname: data.custom.remark_name,
        }
        //把customs直接存入nicknameAndAvatar_urlDatas
        nicknameAndAvatar_urlDatas.push(customs);
        rsNicknameAndAvatar_urlDatas = customs;
    }
    //如果初始数据不为空，则把获取的数据放进customs，并且与初始数据对比，把不重复的放进nicknameAndAvatar_urlDatas，并返回该数据
    else {
        for (let i = 0; i < nicknameAndAvatar_urlDatas.length; i++) {
            //遍历元素，当出现重复的数据，直接返回该数据
            if (customId == nicknameAndAvatar_urlDatas[i].customId) {
                rsNicknameAndAvatar_urlDatas = nicknameAndAvatar_urlDatas[i];
            }
            else {
                num++;
                //当遍历的所有元素之后，并且也没有出现重复的数据，把不重复的放进nicknameAndAvatar_urlDatas，并返回该数据
                if (num == nicknameAndAvatar_urlDatas.length) {
                    let data = getCustomInfomationByCustomId(customId);
                    //把获取的数据放进customs
                    let customs = {
                        customId: customId,
                        avatar_url: data.wechat.avatar_url,
                        nickname: data.custom.remark_name,
                    }
                    //把customs直接存入nicknameAndAvatar_urlDatas
                    nicknameAndAvatar_urlDatas.push(customs);
                    rsNicknameAndAvatar_urlDatas = customs;
                }
            }
        }
    }

    return rsNicknameAndAvatar_urlDatas;
}