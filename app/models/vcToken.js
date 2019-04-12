const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 发送验证码的token
const schema = new Schema({
  token: String,
  // 1是可用，2是不可用
  status: Number,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ token: 1 }, { unique: true })

module.exports = mongoose.model('VcToken', schema)
