const Proxy = require('../proxy')

const UserProxy = Proxy.User
const VcTokenProxy = Proxy.VcToken

/**
 * 登录
 * @param account
 * @param password
 * @returns {Promise<void>}
 */
exports.login = async function (account, password) {
  const user = await UserProxy.findOne({ name: account })
  if (!user) {
    throw new Error('用户不存在')
  }
  if (user.password === password) {
    return user
  } else {
    throw new Error('账户名或密码不正确')
  }
}

/**
 * 注册
 * @param name
 * @param password
 * @returns {Promise<*>}
 */
exports.register = async function (data) {
  const user = await UserProxy.findOne({ name: data.name })
  if (user) {
    throw new Error('用户名已存在')
  }
  return UserProxy.newAndSave(data)
}

exports.sendVerificationCode = async function (data) {
  const vcToken = await VcTokenProxy.findOne({
    token: data.token,
    status: 1
  })
  if (!vcToken) {
    throw new Error('发送异常')
  }
  // TODO发送验证码
  const code = Math.round().toFixed(4).toString().split('.')[1]
  const user = UserProxy.findOne({
    mobile: data.mobile
  })
  // 是否提交过
  if (user) {
    UserProxy.update({
      mobile: data.mobile
    }, {
      verification_code: code,
      // 上次发送验证码时间
      verification_code_last_time: Date.now()
    })
  } else {
    UserProxy.newAndSave({
      mobile: data.mobile,
      verification_code: code,
      // 上次发送验证码时间
      verification_code_last_time: Date.now()
    })
  }

  // 删除
  VcTokenProxy.delete({
    token: data.token
  })
}
