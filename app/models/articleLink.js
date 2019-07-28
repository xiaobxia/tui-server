const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  title: String,
  url: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('ArticleLink', schema)
