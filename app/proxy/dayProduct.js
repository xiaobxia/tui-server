const models = require('../models')

const DayProductModel = models.DayProduct

/**
 * 基本
 */

exports.DayProductModel = DayProductModel

exports.newAndSave = function (data) {
  const dayProduct = new DayProductModel(data)
  return dayProduct.save()
}

exports.delete = function (data) {
  return DayProductModel.remove(data)
}

exports.update = function (query, data) {
  return DayProductModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return DayProductModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return DayProductModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return DayProductModel.findById(id)
}

exports.check = function (query, opt) {
  return DayProductModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return DayProductModel.count(query)
}
