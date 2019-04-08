const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 产品今日数据统计
const schema = new Schema({
  // 日期
  day: String,
  // {channel_id,channel_name,unit_price, 等等}
  detailList: Array,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ day: 1 }, { unique: true })

module.exports = mongoose.model('DayChannel', schema)
