const models = require('../models')

const VisitorModel = models.Visitor

/**
 * 基本
 */

exports.VisitorModel = VisitorModel

exports.newAndSave = function (data) {
  const visitor = new VisitorModel(data)
  return visitor.save()
}

exports.delete = function (data) {
  return VisitorModel.remove(data)
}

exports.update = function (query, data) {
  return VisitorModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return VisitorModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return VisitorModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return VisitorModel.findById(id)
}

exports.check = function (query, opt) {
  return VisitorModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return VisitorModel.count(query)
}
