const Proxy = require('../proxy')
const tableFields = require('../models/tableFields')
const formatUtil = require('../util/format')

const LogAuditProxy = Proxy.LogAudit
const VisitorProxy = Proxy.Visitor
const ChannelProxy = Proxy.Channel

function formatChannelName (listItem, channels) {
  const sourceChannelId = listItem.source_channel_id
  let channelName = ''
  channels.map((channel) => {
    if (channel._id.toString() === sourceChannelId) {
      channelName = channel.channel_name
    }
  })
  if (channelName === '') {
    if (sourceChannelId === 'sys') {
      return '系统'
    } else {
      return '未知'
    }
  }
  return channelName
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
    const channels = ChannelProxy.find({})
    list.map((listItem) => {
      newList.push({
        ...formatUtil.formatFields(tableFields.visitor.resBase, listItem),
        source_channel_name: formatChannelName(listItem, channels)
      })
    })
  }
  return { list: newList, count: fetchData[1] }
}
