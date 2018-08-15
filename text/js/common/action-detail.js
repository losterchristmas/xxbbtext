// import { ENUM_OPERATION, ENUM_ITEM } from 'common/enum-radar'
document.write('<script src="js/common/enum-radar.js"></script>');

function creatActionDetail(operation, module, item, nickname) {
  if (operation === ENUM_OPERATION.see) {
    if (item === ENUM_ITEM.card) {
      return `${nickname}<span class="label">查看</span>了你的<span class="label">名片</span>，成交在望`
    } else if (item === ENUM_ITEM.product) {
      return `${nickname}正在<span class="label">查看</span>你发布的<span class="label">产品</span>，尽快把握商机`
    } else if (item === ENUM_ITEM.trends) {
      return `${nickname}<span class="label">查看</span>了你的<span class="label">动态</span>`
    } else if (item === ENUM_ITEM.website) {
      return `${nickname}<span class="label">查看</span>了你公司的<span class="label">官网</span>，看来TA对公司感兴趣`
    }
  } else if (operation === ENUM_OPERATION.parise) {
    if (item === ENUM_ITEM.card) {
      return `${nickname}给你点<span class="label">赞</span>`
    } else if (item === ENUM_ITEM.trends) {
      return `${nickname}<span class="label">赞</span>了你的<span class="label">动态</span>`
    } else if (item === ENUM_ITEM.whats_up) {
      return `${nickname}<span class="label">赞</span>了你的<span class="label">个性签名</span>`
    }
  } else if (operation === ENUM_OPERATION.transmit) {
    if (item === ENUM_ITEM.card) {
      return `${nickname}<span class="label">转发</span>了你的<span class="label">名片</span>，你的人脉圈正在裂变`
    }
  } else if (operation === ENUM_OPERATION.save) {
    if (item === ENUM_ITEM.phone) {
      return `${nickname}<span class="label">保存</span>了你的<span class="label">电话</span>，可以考虑拜访`
    }
  } else if (operation === ENUM_OPERATION.dial) {
    if (item === ENUM_ITEM.phone) {
      return `${nickname}<span class="label">拨打</span>了你的<span class="label">手机</span>`
    }
  } else if (operation === ENUM_OPERATION.discuss) {
    if (item === ENUM_ITEM.trends) {
      return `${nickname}<span class="label">评论</span>了你的<span class="label">动态</span>`
    }
  } else if (operation === ENUM_OPERATION.play) {
    if (item === ENUM_ITEM.video) {
      return `${nickname}<span class="label">播放</span>了你公司的<span class="label">视频</span>`
    }
  }
}
