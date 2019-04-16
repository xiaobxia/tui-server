const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  // 日期
  day: String,
  channel_id: String,
  channel_name: String,
  verification_code_count: {
    type: Number,
    default: 0
  },
  device_count: {
    type: Number,
    default: 0
  },
  register_count_c: {
    type: Number,
    default: 0
  },
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

module.exports = mongoose.model('DayChannelSingle', schema)
