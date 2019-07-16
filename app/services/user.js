const Proxy = require('../proxy')
const moment = require('moment')
const md5 = require('md5')
const tableFields = require('../models/tableFields')
const formatUtil = require('../util/format')

const UserProxy = Proxy.User
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
    return '自然渠道'
  }
  return channelName
}

/**
 * 修改用户密码
 * @param data
 * @returns {Promise<*>}
 */
exports.newPassword = async function (data) {
  const user = await UserProxy.findOne({ name: data.name })
  if (!user) {
    throw new Error('用户不存在')
  }
  if (user.password !== data.oldPassword) {
    throw new Error('账户名或密码不正确')
  }
  return UserProxy.update({ name: data.name }, {
    password: data.newPassword
  })
}

/**
 * 通过用户名获取用户
 * @param name
 * @returns {Promise<void>}
 */
exports.getUserByName = async function (name) {
  const user = await UserProxy.findOne({ name })
  if (!user) {
    throw new Error('用户不存在')
  }
  return user
}

exports.getAdmin = async function (name) {
  const user = await UserProxy.findOne({ name: name, status: 1 })
  if (!user) {
    throw new Error('用户不存在')
  }
  return user
}

exports.getAdminUsers = async function (paging) {
  let queryOption = {
    roles: {
      $in: [
        'admin',
        'test',
        'buyer-1',
        'buyer-2',
        'buyer-3',
        'buyer-4',
        'buyer-5',
        'buyer-6',
        'buyer-7',
        'buyer-8'
      ]
    }
  }
  const opt = {
    skip: paging.start,
    limit: paging.offset
  }
  const fetchData = await Promise.all([
    UserProxy.find(queryOption, opt),
    UserProxy.count(queryOption)
  ])
  const users = fetchData[0]
  return { list: users, count: fetchData[1] }
}

exports.addAdminUser = async function (data) {
  return UserProxy.newAndSave({
    // 昵称
    name: data.name,
    // 密码明文
    password_raw: data.password_raw,
    // 密码
    password: md5(data.password_raw),
    roles: [data.roles]
  })
}

exports.updateAdminUser = async function (data) {
  let updateData = {}
  if (data.password_raw) {
    updateData.password_raw = data.password_raw
    updateData.password = md5(updateData.password_raw)
  }
  if (data.roles) {
    updateData.roles = [data.roles]
  }
  if (data.status) {
    updateData.status = data.status
  }
  return UserProxy.update({ name: data.name }, updateData)
}

exports.deleteAdminUser = async function (data) {
  return UserProxy.delete({
    _id: data.user_id
  })
}

exports.addClickCount = async function (data) {
  const mobile = data.mobile
  if (!mobile) {
    return false
  }
  const user = await UserProxy.findOne({
    mobile: mobile
  })
  if (!user) {
    return false
  }
  let updateData = {}
  updateData.click_count = (user.click_count || 0) + 1
  return UserProxy.update({
    mobile: mobile
  }, updateData)
}

exports.addViewCount = async function (data) {
  const mobile = data.mobile
  if (!mobile) {
    return false
  }
  const user = await UserProxy.findOne({
    mobile: mobile
  })
  if (!user) {
    return false
  }
  let updateData = {}
  // 活跃度统计，隔两小时后还愿意进入，就记一次
  if (user.last_brisk_day) {
    const diff = moment().diff(user.last_brisk_day, 'hours')
    if (diff >= 2) {
      updateData.last_brisk_day = moment().format('YYYY-MM-DD HH:mm:ss')
      updateData.brisk_count = user.brisk_count + 1
    }
  } else {
    updateData.last_brisk_day = moment().format('YYYY-MM-DD HH:mm:ss')
    updateData.brisk_count = user.brisk_count + 1
  }
  // 页面浏览次数统计
  updateData.view_count = (user.view_count || 0) + 1
  return UserProxy.update({
    mobile: mobile
  }, updateData)
}

exports.getCustomers = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: {
      create_at: -1
    }
  }
  let queryOption = {
    roles: {
      $in: ['user']
    }
  }
  if (query.source_channel_id) {
    queryOption.source_channel_id = query.source_channel_id
  }
  if (query.status) {
    queryOption.status = query.status
  }
  if (query.beginTime) {
    queryOption.create_at = {
      $gte: query.beginTime,
      $lt: query.endTime
    }
  }
  const fetchData = await Promise.all([
    UserProxy.find(queryOption, opt),
    UserProxy.count(queryOption)
  ])
  const list = fetchData[0]
  let newList = []
  if (list.length > 0) {
    const channels = await ChannelProxy.find({})
    list.map((listItem) => {
      newList.push({
        ...formatUtil.formatFields(tableFields.customer.resBase, listItem),
        source_channel_name: formatChannelName(listItem, channels)
      })
    })
  }
  return { list: newList, count: fetchData[1] }
}

exports.setDownload = async function (data) {
  const mobile = data.mobile
  if (!mobile) {
    return false
  }
  // 查出用户
  const user = await UserProxy.findOne({
    mobile: mobile
  })
  if (!user) {
    return false
  }
  let opList = []
  // 如果没有下载过，那就给渠道记一个下载量
  if (user.has_download === false) {
    opList.push(
      UserProxy.update({
        mobile: mobile
      }, {
        has_download: true
      })
    )
    const channel = await ChannelProxy.findOne({
      _id: user.source_channel_id
    })
    if (channel) {
      opList.push(
        ChannelProxy.update({ _id: user.source_channel_id }, {
          today_download_count: channel.today_download_count + 1
        })
      )
    }
  }
  return Promise.all(opList)
}

exports.setHasApp = async function (data) {
  const mobile = data.mobile
  if (!mobile) {
    return false
  }
  // 查出用户
  const user = await UserProxy.findOne({
    mobile: mobile
  })
  if (!user) {
    return false
  }
  let opList = []
  // 如果没有激活app，那就给渠道记一个激活
  if (user.has_app === false) {
    opList.push(
      UserProxy.update({
        mobile: mobile
      }, {
        has_app: true
      })
    )
    const channel = await ChannelProxy.findOne({
      _id: user.source_channel_id
    })
    if (channel) {
      opList.push(
        ChannelProxy.update({ _id: user.source_channel_id }, {
          today_app_count: channel.today_app_count + 1
        })
      )
    }
  }
  return Promise.all(opList)
}
