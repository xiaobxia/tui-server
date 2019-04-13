const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  // 昵称
  name: String,
  // 密码明文
  password_raw: String,
  // 密码
  password: String,
  // 手机号
  mobile: String,
  // 真是姓名
  true_name: String,
  // 性别
  gender: Number,
  // 城市
  city: String,
  // 令牌
  token: String,
  // 角色 []
  roles: Array,
  // 验证码
  verification_code: String,
  // 上次发送验证码时间
  verification_code_last_time: Date,
  // 用户的设备id
  device_id: String,
  // 来源渠道id
  source_channel_id: String,
  click_count: {
    type: Number,
    default: 0
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})
// 1升序，-1降序。比如积分一般在排序时越大的在越前面，所以用降序
// 手机号不重复
schema.index({ mobile: 1 }, { unique: true })

module.exports = mongoose.model('User', schema)
