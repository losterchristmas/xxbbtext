var clerkid = localStorage.getItem("clerkid");

//添加成员信息
function addItem(object) {
    let data = object;
    let s = '<div class="label_style"><div class="label_name">' + data.tag + '</div ><div class="label_num">' + data.praise + '</div><div class="label_del"  data-blind =' + data.id + '>✖</div></div > ';
    $('.labels').append(s);
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

$(document).ready(function () {
    checkClerkId();
    if (!checkClerkId()) {
        window.location.href = "error.html";
        return;
    }
    let label_length;
    getClerkTagsByClerkId(clerkid, function (datas) {
        console.log(datas);
        if (datas.errmsg == "ok") {
            if (datas.count == 0) {
                $(".last_body").show();
            }
            else {
                $(".next_body").show();

                for (let i = 0; i < datas.count; i++) {
                    addItem(datas.list[i]);
                }
            }
            label_length = datas.count
        }
        else {
            $.alert("标签加载失败")
        }
    });
    $('.label_background').hide();
    $("#label_add").hide();
    let flag = 1;
    let num = 0;
    $(document).on("click", "#show-prompt", function () {
        $.prompt({

            text: "标签不能重复，且不能超过6个字",
            title: "输入标签",
            onOK: function (text) {
                let val = text;
                getClerkTagsByClerkId(clerkid, function (datas) {
                    if (datas.count == 0) {
                        if (val.length > 6) {
                            $.alert("超出指定长度", "错误！");
                            flag = 0;
                        }
                    }
                    else {
                        for (let j = 0; j < datas.count; j++) {
                            if (val.length > 6 || val == datas.list[j].tag || val == '请输入标签名') {
                                $.alert("标签名重复或超出指定长度", "错误！");
                                flag = 0;
                                break;
                            }
                            else {
                                flag = 1;
                            }
                        }
                    }
                });



                if (flag == 1) {
                    let tag = text;
                    //增加标签
                    let rs = addClerkTagByClerkIdAndTag(clerkid, tag);
                    getClerkTagsByClerkId(clerkid, function (datas) {

                        if (datas.errmsg == "ok") {
                            $('.labels').empty();
                            num = datas.count - 1; if (rs.errcode == 0) {
                                getClerkTagsByClerkId(clerkid, function (datas) {
                                    console.log(datas);
                                    if (datas.errmsg == "ok") {
                                        if (datas.count == 0) {
                                            $(".last_body").show();
                                        }
                                        else {
                                            $(".next_body").show();

                                            for (let i = 0; i < datas.count; i++) {
                                                addItem(datas.list[i]);
                                            }
                                        }
                                        label_length = datas.count
                                    }
                                    else {
                                        $.alert("标签加载失败")
                                    }
                                });
                                console.log(datas.list[num]);
                                $("#input").val("");
                                label_length = num + 1;
                                if (label_length == 0) {
                                    $(".next_body").hide();
                                    $(".last_body").show();

                                }
                                else {
                                    $(".last_body").hide();
                                    $(".next_body").show();
                                }
                            }
                            else {
                                $.alert("增加失败", "错误！");
                            }
                        }
                    });


                }
            },
            onCancel: function () {
                console.log("取消了");
            },
            input: '请输入标签名'
        });
    });

    $(".label_background").click(function () {
        $('.label_background').hide();
        $("#label_add").hide();
    })
    $("#mask_true").click(function () {
        $("#mask").hide();
        $("#alert").hide();
    })

    //删除标签
    $(document).on("click", ".label_del", function () {
        let _this = $(this);
        let object = $(this)
        let blind = object.attr('data-blind');
        $.confirm("", "确认删除?", function () {
            deleteClerkTagByClerkIdAndTagId(clerkid, blind, function (deleteRs) {
                if (deleteRs.errmsg == "ok") {

                    _this.parent().hide();
                    label_length -= 1;
                    if (label_length == 0) {
                        $(".next_body").hide();
                        $(".last_body").show();
                    }
                    else {
                        $(".last_body").hide();
                        $(".next_body").show();
                    }
                } else {
                    $.alert("删除失败", "错误！");
                }
            });

        });
    })
});