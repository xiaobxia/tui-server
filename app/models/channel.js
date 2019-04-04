const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 渠道
const schema = new Schema({
  // 渠道的id就是渠道的标识
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  // 渠道名
  channel_name: String,
  // 渠道用户浏览注册次数
  history_register_view_count: {
    type: Number,
    default: 0
  },
  today_register_view_count: {
    type: Number,
    default: 0
  },
  // 渠道用户验证码发送次数
  history_verification_code_count: {
    type: Number,
    default: 0
  },
  today_verification_code_count: {
    type: Number,
    default: 0
  },
  // 渠道用户注册数
  history_register_count: {
    type: Number,
    default: 0
  },
  today_register_count: {
    type: Number,
    default: 0
  },
  // 渠道用户设备数
  history_device_count: {
    type: Number,
    default: 0
  },
  today_device_count: {
    type: Number,
    default: 0
  },
  // 渠道用户浏览首页次数
  history_home_view_count: {
    type: Number,
    default: 0
  },
  today_home_view_count: {
    type: Number,
    default: 0
  },
  // 渠道用户浏览首页次数
  history_loan_view_count: {
    type: Number,
    default: 0
  },
  today_loan_view_count: {
    type: Number,
    default: 0
  },
  // 渠道用户点击链接次数
  history_click_count: {
    type: Number,
    default: 0
  },
  today_click_count: {
    type: Number,
    default: 0
  },
  // 给渠道看的注册数
  history_today_register_count_c: {
    type: Number,
    default: 0
  },
  today_register_count_c: {
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
