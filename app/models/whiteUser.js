const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: String,
  // 手机号
  mobile: String,
  // 是否实名
  if_true_name: {
    type: Boolean,
    default: false
  },
  true_name_at: {
    type: Date
  },
  // 是否下款
  if_down: {
    type: Boolean,
    default: false
  },
  down_at: {
    type: Date
  },
  // 是否回款
  if_back: {
    type: Boolean,
    default: false
  },
  back_at: {
    type: Date
  },
  // 来源(xjd,dc)
  source: String,
  // 真是姓名
  true_name: String,
  // 性别（1：男，2：女）
  gender: Number,
  // 身份证
  id_card: String,
  // 地区编码
  region_code: String,
  // 住址
  address: String,
  // 联系人名字
  contact_name: String,
  // 联系人号码
  contact_mobile: String,
  // 联系人关系
  contact_relation_ship: String,
  // 微信号
  wechat_number: String,
  // qq号
  qq_number: String,
  // 教育程度
  education_type: String,
  // 芝麻分
  zhima_score: String,
  // 点击次数
  click_count: {
    type: Number,
    default: 0
  },
  if_contact: {
    type: Boolean,
    default: false
  },
  // 活跃时间
  active_at: {
    type: Date
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

// 手机号不重复
schema.index({ mobile: 1 }, { unique: true })

module.exports = mongoose.model('WhiteUser', schema)
