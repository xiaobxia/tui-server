const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  // 昵称
  name: String,
  // 密码，使用明文
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
  // 用户的设备id，是个数组，一个用户可能对应多台设备
  device_id: Array,
  // 来源渠道id
  channel_id: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})
// 1升序，-1降序。比如积分一般在排序时越大的在越前面，所以用降序
// 名字不重复
schema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('User', schema)
