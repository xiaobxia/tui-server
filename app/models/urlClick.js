const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 用户点击产品链接
const schema = new Schema({
  // 用户手机号
  mobile: String,
  // 设备id
  device_id: String,
  // 来源渠道id
  channel_id: String,
  // 产品id
  product_id: String,
  // 设备类型（iso，安卓，微信）
  device_type: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

// 渠道id设为索引
schema.index({ channel_id: 1 })

module.exports = mongoose.model('Visitor', schema)
