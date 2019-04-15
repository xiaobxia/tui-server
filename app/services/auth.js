const Proxy = require('../proxy')

const UserProxy = Proxy.User
const VcTokenProxy = Proxy.VcToken
const ChannelProxy = Proxy.Channel

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
  const code = Math.random().toFixed(4).toString().split('.')[1]
  const fData = await Promise.all([
    ChannelProxy.findOne({
      _id: data.source_channel_id
    }),
    UserProxy.findOne({
      mobile: data.mobile
    })
  ])
  const channel = fData[0]
  const user = fData[1]
  // 更新渠道验证码发送统计
  await ChannelProxy.update({
    _id: data.source_channel_id
  }, {
    today_verification_code_count: channel.today_verification_code_count + 1
  })
  // 是否提交过
  if (user) {
    await UserProxy.update({
      mobile: data.mobile
    }, {
      verification_code: code,
      // 上次发送验证码时间
      verification_code_last_time: Date.now()
    })
  } else {
    await UserProxy.newAndSave({
      mobile: data.mobile,
      // 未激活，确定点击注册了才算激活
      status: 2,
      // 用户
      roles: ['user'],
      source_channel_id: data.source_channel_id,
      verification_code: code,
      // 上次发送验证码时间
      verification_code_last_time: Date.now()
    })
  }
  // 删除token
  return VcTokenProxy.delete({
    token: data.token
  })
}

exports.activeByVerificationCode = async function (data) {
  const user = await UserProxy.findOne({
    mobile: data.mobile
  })
  if (!user) {
    throw new Error('验证码不正确')
  }
  if (user.verification_code === data.code) {
    if (user.status === 2) {
      const channel = await ChannelProxy.findOne({
        _id: data.source_channel_id
      })
      let channelUpdateData = {
        today_register_count: channel.today_register_count + 1
      }
      if (Math.random() < channel.deduction_base) {
        channelUpdateData.today_register_count_c = channel.today_register_count_c + 1
      }
      return Promise.all([
        UserProxy.update({
          mobile: data.mobile
        }, {
          status: 1
        }),
        ChannelProxy.update({
          _id: data.source_channel_id
        }, channelUpdateData)
      ])
    } else {
      return true
    }
  } else {
    throw new Error('验证码不正确')
  }
}
