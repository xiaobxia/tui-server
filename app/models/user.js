const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: String,
  password: String,
  email: String,
  mobile: String,
  true_name: String,
  // 性别
  gender: Number,
  birthday: Date,
  city: String,
  website: String,
  company: String,
  school: String,
  job: String,
  introduce: String,
  token: String,
  // 角色 []
  roles: Array,
  last_login_date: Date,
  // 验证码
  verification_code: String,
  // 用户的设备id，是个数组，在多个地方登陆
  device_id: Array,
  create_at: {
    type: Date,
    default: Date.now
  }
})
// 1升序，-1降序。比如积分一般在排序时越大的在越前面，所以用降序
// 名字不重复
schema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('User', schema)
