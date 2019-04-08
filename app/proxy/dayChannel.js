const models = require('../models')

const DayChannelModel = models.DayChannel

/**
 * 基本
 */

exports.DayChannelModel = DayChannelModel

exports.newAndSave = function (data) {
  const dayChannel = new DayChannelModel(data)
  return dayChannel.save()
}

exports.delete = function (data) {
  return DayChannelModel.remove(data)
}

exports.update = function (query, data) {
  return DayChannelModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return DayChannelModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return DayChannelModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return DayChannelModel.findById(id)
}

exports.check = function (query, opt) {
  return DayChannelModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return DayChannelModel.count(query)
}
