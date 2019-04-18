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
  view_count: {
    type: Number,
    default: 0
  },
  click_count: {
    type: Number,
    default: 0
  },
  // 活跃度
  brisk_count: {
    type: Number,
    default: 0
  },
  // 上次活跃时间
  last_brisk_day: String,
  // 1激活，2未激活
  status: {
    type: Number,
    default: 1
  },
  has_app: {
    type: Boolean,
    default: false
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})
// 1升序，-1降序。比如积分一般在排序时越大的在越前面，所以用降序
// 手机号不重复

module.exports = mongoose.model('User', schema)
