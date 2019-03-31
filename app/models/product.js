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
  // 期限单位（日，月，年）
  term_unit: String,
  // 最低期限
  min_term: Number,
  // 最高期限
  max_term: Number,
  // 日利率
  daily_rate: Number,
  // 放款时间单位（分钟，小时）
  lending_time_unit: Number,
  // 放款时间
  lending_time: Number,
  // 芝麻分
  zhi_ma: Number,
  // 成功率
  success_rate: Number,
  // 链接点击次数
  click_count: {
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
  // 注册数，由甲方提供
  register_count: {
    type: Number,
    default: 0
  },
  // 单价
  unit_price: {
    type: Number,
    default: 0
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', schema)
