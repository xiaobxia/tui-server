const Proxy = require('../proxy')
const md5 = require('md5')

const ChannelProxy = Proxy.Channel
const UserProxy = Proxy.User

exports.getChannels = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: 'status'
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
  const list = await ChannelProxy.find({})
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
