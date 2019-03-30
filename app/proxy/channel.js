const models = require('../models')

const ChannelModel = models.Channel

/**
 * 基本
 */

exports.ChannelModel = ChannelModel

exports.newAndSave = function (data) {
  const channel = new ChannelModel(data)
  return channel.save()
}

exports.delete = function (data) {
  return ChannelModel.remove(data)
}

exports.update = function (query, data) {
  return ChannelModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return ChannelModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return ChannelModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return ChannelModel.findById(id)
}

exports.check = function (query, opt) {
  return ChannelModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return ChannelModel.count(query)
}

exports.findWithUser = function (query, opt) {
  return ChannelModel.find(query, {}, opt).populate('user')
}
