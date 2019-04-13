const Proxy = require('../proxy')
const md5 = require('md5')

const UserProxy = Proxy.User

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

exports.getAdminUsers = async function (paging) {
  let queryOption = {
    roles: {
      $in: ['admin', 'test']
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
    password_raw: data.password,
    // 密码
    password: md5(data.password),
    roles: [data.roles]
  })
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
