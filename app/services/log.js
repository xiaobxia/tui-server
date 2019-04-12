const uuidv1 = require('uuid/v1')
const Proxy = require('../proxy')
const tableFields = require('../models/tableFields')
const formatUtil = require('../util/format')

const LogAuditProxy = Proxy.LogAudit
const VisitorProxy = Proxy.Visitor
const ChannelProxy = Proxy.Channel
const UrlClickProxy = Proxy.UrlClick
const ProductProxy = Proxy.Product
const VcTokenProxy = Proxy.VcToken

function formatChannelName (listItem, channels) {
  const sourceChannelId = listItem.source_channel_id
  let channelName = ''
  channels.map((channel) => {
    if (channel._id.toString() === sourceChannelId) {
      channelName = channel.channel_name
    }
  })
  if (channelName === '') {
    return '自然渠道'
  }
  return channelName
}

function formatProductName (listItem, products) {
  const productId = listItem.product_id
  let productName = ''
  products.map((product) => {
    if (product._id.toString() === productId) {
      productName = product.name
    }
  })
  if (productName === '') {
    return '未知'
  }
  return productName
}

/**
 * 添加日志
 * @param data
 * @returns {Promise<*>}
 */
exports.addLogAudit = async function (data) {
  return LogAuditProxy.newAndSave(data)
}

exports.addVisitorLog = async function (data) {
  return VisitorProxy.newAndSave(data)
}

exports.getVisitorLog = async function (data, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: '-create_at'
  }
  let queryOption = {}
  if (data.device_id) {
    queryOption.device_id = data.device_id
  }
  if (data.source_channel_id) {
    queryOption.source_channel_id = data.source_channel_id
  }
  if (data.device_type) {
    queryOption.device_type = data.device_type
  }
  if (data.page) {
    queryOption.page = data.page
  }
  if (data.beginTime) {
    queryOption.create_at = {
      $gte: data.beginTime,
      $lt: data.endTime
    }
  }
  const fetchData = await Promise.all([
    VisitorProxy.find(queryOption, opt),
    VisitorProxy.count(queryOption)
  ])
  const list = fetchData[0]
  let newList = []
  if (list.length > 0) {
    const channels = await ChannelProxy.find({})
    list.map((listItem) => {
      newList.push({
        ...formatUtil.formatFields(tableFields.visitor.resBase, listItem),
        source_channel_name: formatChannelName(listItem, channels)
      })
    })
  }
  return { list: newList, count: fetchData[1] }
}

exports.addUrlClickLog = async function (data) {
  return UrlClickProxy.newAndSave(data)
}

exports.getUrlClickLog = async function (data, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: '-create_at'
  }
  let queryOption = {}
  if (data.product_id) {
    queryOption.product_id = data.product_id
  }
  if (data.source_channel_id) {
    queryOption.source_channel_id = data.source_channel_id
  }
  if (data.device_type) {
    queryOption.device_type = data.device_type
  }
  if (data.mobile) {
    queryOption.mobile = data.mobile
  }
  if (data.beginTime) {
    queryOption.create_at = {
      $gte: data.beginTime,
      $lt: data.endTime
    }
  }
  const fetchData = await Promise.all([
    UrlClickProxy.find(queryOption, opt),
    UrlClickProxy.count(queryOption)
  ])
  const list = fetchData[0]
  let newList = []
  if (list.length > 0) {
    const channels = await ChannelProxy.find({})
    const products = await ProductProxy.find({})
    list.map((listItem) => {
      newList.push({
        ...formatUtil.formatFields(tableFields.urlClick.resBase, listItem),
        source_channel_name: formatChannelName(listItem, channels),
        product_name: formatProductName(listItem, products)
      })
    })
  }
  return { list: newList, count: fetchData[1] }
}

exports.addVerificationCodeToken = async function () {
  let data = {
    token: uuidv1(),
    status: 1
  }
  return VcTokenProxy.newAndSave(data)
}
