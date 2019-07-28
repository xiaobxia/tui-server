const models = require('../models')

const ArticleLinkModel = models.ArticleLink

/**
 * 基本
 */

exports.ArticleLinkModel = ArticleLinkModel

exports.newAndSave = function (data) {
  const articleLink = new ArticleLinkModel(data)
  return articleLink.save()
}

exports.delete = function (data) {
  return ArticleLinkModel.remove(data)
}

exports.update = function (query, data) {
  return ArticleLinkModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return ArticleLinkModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return ArticleLinkModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return ArticleLinkModel.findById(id)
}

exports.check = function (query, opt) {
  return ArticleLinkModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return ArticleLinkModel.count(query)
}
