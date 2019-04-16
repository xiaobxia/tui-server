const Proxy = require('../proxy')
const md5 = require('md5')
const tableFields = require('../models/tableFields')

const ChannelProxy = Proxy.Channel
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

exports.getRealChannel = async function (data) {
  // 既没渠道id，又查不到用户的，才计入自然渠道
  if (data.source_channel_id && isObjectId(data.source_channel_id)) {
    return ChannelProxy.findOne({
      _id: data.source_channel_id
    })
  } if (data.mobile) {
    const user = await UserProxy.findOne({
      mobile: data.mobile
    })
    if (user && user.source_channel_id) {
      return ChannelProxy.findOne({
        _id: user.source_channel_id
      })
    }
  }
  return ChannelProxy.findOne({
    channel_name: '自然渠道'
  })
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

exports.getChannel = async function (data) {
  return ChannelProxy.findOne({ _id: data.channel_id })
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

exports.updateChannel = async function (data) {
  const channelUpdateModel = tableFields.createUpdateModel(
    tableFields.channel.update,
    data
  )
  return ChannelProxy.update({
    _id: data._id
  }, {
    ...channelUpdateModel
  })
}

exports.updateChannelStatus = async function (data) {
  return ChannelProxy.update({
    _id: data.channel_id
  }, {
    status: data.status
  })
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

exports.updateChannelRegisterC = async function (data) {
  return ChannelProxy.update({
    _id: data.channel_id
  }, {
    unit_price: data.unit_price,
    today_register_count_c: data.today_register_count_c
  })
}

exports.initDayChannels = async function () {
  const channels = await ChannelProxy.find({})
  let list = []
  for (let i = 0; i < channels.length; i++) {
    const item = channels[i]
    list.push(ChannelProxy.update({
      _id: item._id
    }, {
      history_verification_code_count: item.history_verification_code_count + item.today_verification_code_count,
      history_register_count_c: item.history_register_count_c + item.today_register_count_c,
      history_click_count: item.history_click_count + item.today_click_count,
      history_register_count: item.history_register_count + item.today_register_count,
      today_verification_code_count: 0,
      today_register_count_c: 0,
      today_click_count: 0,
      today_register_count: 0
    }))
  }
  return Promise.all(list)
}
