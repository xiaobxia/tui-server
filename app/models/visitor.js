const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 游客（用于注册页面，那时还不算用户）
const schema = new Schema({
  // 设备id
  device_id: String,
  // 来源渠道id
  channel_id: String,
  // 设备类型（iso，安卓，微信）
  device_type: String,
  // 省
  province: String,
  // 市
  city: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

// 渠道id设为索引
schema.index({ channel_id: 1 })

module.exports = mongoose.model('Visitor', schema)
