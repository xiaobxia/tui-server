const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 渠道
const schema = new Schema({
  // 渠道用户浏览注册次数
  register_view_count: Number,
  // 渠道用户验证码发送次数
  verification_code_count: Number,
  // 渠道用户注册数
  register_count: Number,
  // 渠道用户设备数
  device_count: Number,
  // 渠道用户浏览首页次数
  home_view_count: Number,
  // 渠道用户点击链接次数
  click_count: Number,
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Channel', schema)
