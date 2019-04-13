const models = require('../models')

const DayChannelSingleModel = models.DayChannelSingle

/**
 * 基本
 */

exports.DayChannelSingleModel = DayChannelSingleModel

exports.newAndSave = function (data) {
  const dayChannelSingle = new DayChannelSingleModel(data)
  return dayChannelSingle.save()
}

exports.delete = function (data) {
  return DayChannelSingleModel.remove(data)
}

exports.update = function (query, data) {
  return DayChannelSingleModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return DayChannelSingleModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return DayChannelSingleModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return DayChannelSingleModel.findById(id)
}

exports.check = function (query, opt) {
  return DayChannelSingleModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return DayChannelSingleModel.count(query)
}
