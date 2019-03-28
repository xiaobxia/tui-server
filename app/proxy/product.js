const models = require('../models')

const ProductModel = models.Product

/**
 * 基本
 */

exports.ProductModel = ProductModel

exports.newAndSave = function (data) {
  const product = new ProductModel(data)
  return product.save()
}

exports.delete = function (data) {
  return ProductModel.remove(data)
}

exports.update = function (query, data) {
  return ProductModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return ProductModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return ProductModel.findOne(query, {}, opt)
}

exports.findOneById = function (id) {
  return ProductModel.findById(id)
}

exports.check = function (query, opt) {
  return ProductModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return ProductModel.count(query)
}
