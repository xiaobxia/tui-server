const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 产品
const schema = new Schema({
  // 名称
  name: String,
  // 链接
  url: String,
  // 图标链接
  icon_url: String,
  // 最低额度
  min_quota: Number,
  // 最高额度
  max_quota: Number,
  // 期限单位（日，周，月，年）
  term_unit: String,
  // 最低期限
  min_term: Number,
  // 最高期限
  max_term: Number,
  // 日利率
  daily_rate: Number,
  // 下款时间单位（分钟，小时，日）
  lending_time_unit: String,
  // 下款时间
  lending_time: Number,
  // 芝麻分
  zhi_ma: Number,
  // 成功率
  success_rate: Number,
  // 链接点击次数
  history_click_count: {
    type: Number,
    default: 0
  },
  // 今日点击次数
  today_click_count: {
    type: Number,
    default: 0
  },
  // 是否推荐
  is_recommend: {
    type: Boolean,
    default: false
  },
  // 是否活动
  is_activity: {
    type: Boolean,
    default: false
  },
  // 状态（1已上架，2已下架）
  status: {
    type: Number,
    default: 1
  },
  // 今日注册数
  today_register_count: {
    type: Number,
    default: 0
  },
  // 历史注册数
  history_register_count: {
    type: Number,
    default: 0
  },
  // 单价
  unit_price: {
    type: Number,
    default: 0
  },
  // 排序索引，越大越靠前
  sortIndex: {
    type: Number,
    default: 100
  },
  // 产品简介
  introduction: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('Product', schema)
