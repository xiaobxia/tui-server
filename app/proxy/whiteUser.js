const models = require('../models')

const WhiteUserModel = models.WhiteUser

/**
 * 基本
 */

exports.WhiteUserModel = WhiteUserModel

exports.newAndSave = function (data) {
  const whiteUser = new WhiteUserModel(data)
  return whiteUser.save()
}

exports.delete = function (data) {
  return WhiteUserModel.remove(data)
}

exports.update = function (query, data) {
  return WhiteUserModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return WhiteUserModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return WhiteUserModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return WhiteUserModel.findById(id)
}

exports.check = function (query, opt) {
  return WhiteUserModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return WhiteUserModel.count(query)
}
