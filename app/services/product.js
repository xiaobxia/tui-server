const Proxy = require('../proxy')
const tableFields = require('../models/tableFields')

const ProductProxy = Proxy.Product

exports.getProduct = async function (query) {
  return ProductProxy.findOne({
    _id: query.product_id
  })
}

exports.getProducts = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: {
      status: 1,
      create_at: -1
    }
  }
  const productQueryModel = tableFields.createQueryModel(
    tableFields.product.query,
    query
  )
  let queryOption = {
    ...productQueryModel
  }
  const fetchData = await Promise.all([
    ProductProxy.find(queryOption, opt),
    ProductProxy.count(queryOption)
  ])
  const list = fetchData[0]
  return { list, count: fetchData[1] }
}

exports.getUserProducts = async function (query, paging) {
  const opt = {
    sort: {
      is_recommend: -1
    }
  }
  const productQueryModel = tableFields.createQueryModel(
    tableFields.product.query,
    query
  )
  let queryOption = {
    ...productQueryModel,
    status: 1
  }
  const fetchData = await Promise.all([
    ProductProxy.find(queryOption, opt),
    ProductProxy.count(queryOption)
  ])
  const list = fetchData[0]
  return { list, count: fetchData[1] }
}

exports.addProduct = async function (data) {
  return ProductProxy.newAndSave(data)
}

exports.updateProductStatus = async function (data) {
  return ProductProxy.update({
    _id: data.product_id
  }, {
    status: data.status
  })
}

exports.updateProduct = async function (data) {
  const productUpdateModel = tableFields.createUpdateModel(
    tableFields.product.update,
    data
  )
  console.log(productUpdateModel)
  return ProductProxy.update({
    _id: data._id
  }, {
    ...productUpdateModel
  })
}

exports.getProductsAll = async function () {
  const list = await ProductProxy.find({ status: 1 })
  return { list }
}

exports.addProductClickLog = async function (data) {
  const productId = data.product_id
  const product = await ProductProxy.findOne({
    _id: productId
  })
  if (!product) {
    return false
  }
  let updateData = {}
  updateData.today_click_count = product.today_click_count + 1
  return ProductProxy.update({
    _id: productId
  }, updateData)
}
