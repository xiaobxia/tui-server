const models = require('../models')

const DayProductSingleModel = models.DayProductSingle

/**
 * 基本
 */

exports.DayProductSingleModel = DayProductSingleModel

exports.newAndSave = function (data) {
  const dayProductSingle = new DayProductSingleModel(data)
  return dayProductSingle.save()
}

exports.delete = function (data) {
  return DayProductSingleModel.remove(data)
}

exports.update = function (query, data) {
  return DayProductSingleModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return DayProductSingleModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return DayProductSingleModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return DayProductSingleModel.findById(id)
}

exports.check = function (query, opt) {
  return DayProductSingleModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return DayProductSingleModel.count(query)
}
