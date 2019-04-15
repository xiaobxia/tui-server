const tableFields = require('../models/tableFields')

const productQueryValidateModel = tableFields.createQueryValidateModel(
  tableFields.product.query
)

const productUpdateValidateModel = tableFields.createUpdateValidateModel(
  tableFields.product.update
)

exports.getProduct = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      product_id: { type: 'string', required: true }
    }, query)
    const product = await ctx.services.product.getProduct(data)
    ctx.body = ctx.resuccess(product)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getProducts = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      ...productQueryValidateModel
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const products = await ctx.services.product.getProducts(data, paging)
    ctx.body = ctx.resuccess(products)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addProduct = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      name: { type: 'string', required: true },
      url: { type: 'string', required: true },
      unit_price: { type: 'number', required: true },
      introduction: { type: 'string', required: true }
    }, query)
    await ctx.services.product.addProduct(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.updateProduct = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      _id: { type: 'string', required: true },
      ...productUpdateValidateModel
    }, query)
    console.log(productUpdateValidateModel)
    await ctx.services.product.updateProduct(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.updateProductStatus = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      product_id: { type: 'string', required: true },
      status: { type: 'int', required: true }
    }, query)
    await ctx.services.product.updateProductStatus(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getUserProducts = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      ...productQueryValidateModel
    }, query)
    const products = await ctx.services.product.getUserProducts(data)
    ctx.body = ctx.resuccess(products)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getProductsAll = async function (ctx) {
  try {
    const products = await ctx.services.product.getProductsAll()
    ctx.body = ctx.resuccess(products)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getProductsNew = async function (ctx) {
  try {
    const products = await ctx.services.product.getProductsNew()
    ctx.body = ctx.resuccess(products)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getProductsQuick = async function (ctx) {
  try {
    const products = await ctx.services.product.getProductsQuick()
    ctx.body = ctx.resuccess(products)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getProductsHot = async function (ctx) {
  try {
    const products = await ctx.services.product.getProductsHot()
    ctx.body = ctx.resuccess(products)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getProductsBig = async function (ctx) {
  try {
    const products = await ctx.services.product.getProductsBig()
    ctx.body = ctx.resuccess(products)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
