const Proxy = require('../proxy')
const md5 = require('md5')

const ChannelProxy = Proxy.Channel
const VisitorProxy = Proxy.Visitor
const UserProxy = Proxy.User

const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$')
function isObjectId (id) {
  if (!id) {
    return false
  }
  if (typeof id === 'number') {
    return false
  }
  var value = id.toString()
  if (value.length !== 12 && value.length !== 24) {
    return false
  } else {
    if (value.length === 24) {
      return checkForHexRegExp.test(value)
    }
    return false
  }
}

exports.getRealChannelId = async function (id) {
  if (isObjectId(id)) {
    return id
  } else {
    const channel = await ChannelProxy.findOne({
      channel_name: '自然渠道'
    })
    return channel._id
  }
}

exports.getChannels = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: {
      status: 1,
      create_at: -1
    }
  }
  let queryOption = {}
  if (query.channel_name) {
    queryOption.channel_name = new RegExp(query.channel_name, 'i')
  }
  if (query.status) {
    queryOption.status = query.status
  }
  const fetchData = await Promise.all([
    ChannelProxy.findWithUser(queryOption, opt),
    ChannelProxy.count(queryOption)
  ])
  const list = fetchData[0]
  return { list, count: fetchData[1] }
}

exports.getChannelsAll = async function () {
  const list = await ChannelProxy.find({ status: 1 })
  return { list }
}

exports.addChannel = async function (data) {
  const user = await UserProxy.newAndSave({
    // 昵称
    name: data.name,
    // 密码明文
    password_raw: data.password,
    // 密码
    password: md5(data.password),
    roles: ['channel']
  })
  return ChannelProxy.newAndSave({
    // 渠道的id就是渠道的标识
    user: user._id,
    // 渠道名
    channel_name: data.channel_name
  })
}

exports.deleteChannel = async function (data) {
  const channel = await ChannelProxy.findOne({
    _id: data.channel_id
  })
  if (!channel) {
    return false
  }
  await UserProxy.delete({
    _id: channel.user
  })
  return ChannelProxy.delete({
    _id: data.channel_id
  })
}

exports.updateChannelStatus = async function (data) {
  return ChannelProxy.update({
    _id: data.channel_id
  }, {
    status: data.status
  })
}

exports.addChannelViewCount = async function (data) {
  const channelId = data.source_channel_id
  const page = data.page
  const deviceId = data.device_id
  const channel = await ChannelProxy.findOne({
    _id: channelId
  })
  if (!channel) {
    return false
  }
  let updateData = {}
  const visitors = await VisitorProxy.find({
    source_channel_id: channelId,
    device_id: deviceId
  })
  if (visitors.length === 0) {
    updateData.today_device_count = channel.today_device_count + 1
  }
  if (page === 'register') {
    updateData.today_register_view_count = channel.today_register_view_count + 1
  } else if (page === 'home') {
    updateData.today_home_view_count = channel.today_home_view_count + 1
  } else if (page === 'loan') {
    updateData.today_loan_view_count = channel.today_loan_view_count + 1
  }
  return ChannelProxy.update({
    _id: channelId
  }, updateData)
}

exports.addChannelClickCount = async function (data) {
  const channelId = data.source_channel_id
  const channel = await ChannelProxy.findOne({
    _id: channelId
  })
  if (!channel) {
    return false
  }
  let updateData = {}
  updateData.today_click_count = channel.today_click_count + 1
  return ChannelProxy.update({
    _id: channelId
  }, updateData)
}
