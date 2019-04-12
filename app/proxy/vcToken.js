const models = require('../models')

const VcTokenModel = models.VcToken

/**
 * 基本
 */

exports.VcTokenModel = VcTokenModel

exports.newAndSave = function (data) {
  const vcToken = new VcTokenModel(data)
  return vcToken.save()
}

exports.delete = function (data) {
  return VcTokenModel.remove(data)
}

exports.update = function (query, data) {
  return VcTokenModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return VcTokenModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return VcTokenModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return VcTokenModel.findById(id)
}

exports.check = function (query, opt) {
  return VcTokenModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return VcTokenModel.count(query)
}
