const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 游客
const schema = new Schema({
  // 设备id
  device_id: String,
  // 来源渠道id
  source_channel_id: String,
  // 设备类型（ios，安卓，微信）
  device_type: String,
  // 浏览的页面
  page: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

// 渠道id设为索引
schema.index({ source_channel_id: 1 })

module.exports = mongoose.model('Visitor', schema)
