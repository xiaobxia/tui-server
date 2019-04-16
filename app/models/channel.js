const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 渠道
const schema = new Schema({
  // 渠道的id就是渠道的标识
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  // 渠道名
  channel_name: String,
  // 扣量基数
  deduction_base: {
    type: Number,
    default: 1
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
  history_register_count_c: {
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
  url: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ channel_name: 1 }, { unique: true })

module.exports = mongoose.model('Channel', schema)
