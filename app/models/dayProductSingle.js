const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 产品今日数据统计
const schema = new Schema({
  // 日期
  day: String,
  product_id: String,
  product_name: String,
  click_count: {
    type: Number,
    default: 0
  },
  register_count: {
    type: Number,
    default: 0
  },
  unit_price: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 0
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ day: 1 })

module.exports = mongoose.model('DayProductSingleSingle', schema)
