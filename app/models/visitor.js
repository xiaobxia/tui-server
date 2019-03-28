const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 游客
const schema = new Schema({
  // 设备id
  device_id: String,
  // iso，安卓，微信
  device_type: String,
  // 省
  province: String,
  // 市
  city: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Visitor', schema)
