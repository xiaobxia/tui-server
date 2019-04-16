const uuidv1 = require('uuid/v1')
const Proxy = require('../proxy')
// const tableFields = require('../models/tableFields')
// const formatUtil = require('../util/format')

const LogAuditProxy = Proxy.LogAudit
const VcTokenProxy = Proxy.VcToken

// function formatChannelName (listItem, channels) {
//   const sourceChannelId = listItem.source_channel_id
//   let channelName = ''
//   channels.map((channel) => {
//     if (channel._id.toString() === sourceChannelId) {
//       channelName = channel.channel_name
//     }
//   })
//   if (channelName === '') {
//     return '自然渠道'
//   }
//   return channelName
// }
//
// function formatProductName (listItem, products) {
//   const productId = listItem.product_id
//   let productName = ''
//   products.map((product) => {
//     if (product._id.toString() === productId) {
//       productName = product.name
//     }
//   })
//   if (productName === '') {
//     return '未知'
//   }
//   return productName
// }

/**
 * 添加日志
 * @param data
 * @returns {Promise<*>}
 */
exports.addLogAudit = async function (data) {
  return LogAuditProxy.newAndSave(data)
}

exports.addVerificationCodeToken = async function () {
  let data = {
    token: uuidv1(),
    status: 1
  }
  return VcTokenProxy.newAndSave(data)
}
