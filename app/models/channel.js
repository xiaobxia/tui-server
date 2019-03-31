const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 渠道
const schema = new Schema({
  // 渠道的id就是渠道的标识
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  // 渠道名
  channel_name: String,
  // 渠道用户浏览注册次数
  register_view_count: {
    type: Number,
    default: 0
  },
  // 渠道用户验证码发送次数
  verification_code_count: {
    type: Number,
    default: 0
  },
  // 渠道用户注册数
  register_count: {
    type: Number,
    default: 0
  },
  // 渠道用户设备数
  device_count: {
    type: Number,
    default: 0
  },
  // 渠道用户浏览首页次数
  home_view_count: {
    type: Number,
    default: 0
  },
  // 渠道用户点击链接次数
  click_count: {
    type: Number,
    default: 0
  },
  // 给渠道看的注册数
  register_count_c: {
    type: Number,
    default: 0
  },
  // 单价
  unit_price: {
    type: Number,
    default: 0
  },
  // 状态（1已上架，2已下架）
  status: {
    type: Number,
    default: 1
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Channel', schema)
