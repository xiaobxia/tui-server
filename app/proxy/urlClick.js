const models = require('../models')

const UrlClickModel = models.UrlClick

/**
 * 基本
 */

exports.UrlClickModel = UrlClickModel

exports.newAndSave = function (data) {
  const urlClick = new UrlClickModel(data)
  return urlClick.save()
}

exports.delete = function (data) {
  return UrlClickModel.remove(data)
}

exports.update = function (query, data) {
  return UrlClickModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return UrlClickModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return UrlClickModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return UrlClickModel.findById(id)
}

exports.check = function (query, opt) {
  return UrlClickModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return UrlClickModel.count(query)
}
