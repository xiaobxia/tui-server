const tokenRes = [
  { field: '_id' },
  { field: 'name' },
  { field: 'roles' },
  { field: 'mobile' },
  { field: 'channel_id' },
  { field: 'channel_name' }
]
/**
 * 注册
 * @param ctx
 * @returns {Promise<void>}
 */
exports.register = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      name: { required: true, type: 'string' },
      password: { required: true, type: 'string' },
      email: { required: true, type: 'string' },
      platform: { required: true, type: 'string' }
    }, query)
    const userRaw = await ctx.services.auth.register(ctx.queryDataFilter(data, 'platform'))
    const user = ctx.formatFields(tokenRes, userRaw)
    // 登录在线时间
    const keepDay = 7
    const token = ctx.token.sign(user, 60 * 60 * 24 * keepDay)
    // 添加注册日志
    ctx.services.log.addLogAudit({
      log_type: 'register',
      platform: data.platform,
      user_id: userRaw._id,
      user_name: userRaw.name
    })
    ctx.body = ctx.resuccess({
      token,
      ...user
    })
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

/**
 * 登录
 * @param ctx
 * @returns {Promise<void>}
 */
exports.login = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      account: { required: true, type: 'string' },
      password: { required: true, type: 'string' },
      platform: { required: true, type: 'string' }
    }, query)
    const userRaw = await ctx.services.auth.login(data.account, data.password)
    const user = ctx.formatFields(tokenRes, userRaw)
    // 登录在线时间
    const keepDay = 7
    const token = ctx.token.sign(user, 60 * 60 * 24 * keepDay)
    // 添加登录日志
    ctx.services.log.addLogAudit({
      log_type: 'login',
      platform: data.platform,
      user_id: userRaw._id,
      user_name: userRaw.name
    })
    ctx.body = ctx.resuccess({
      ...user,
      token
    })
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

/**
 * 检查登录状态
 * @param ctx
 * @returns {Promise<void>}
 */
exports.checkLogin = async function (ctx) {
  const token = ctx.query.token
  if (token) {
    try {
      const tokenRaw = ctx.token.verify(token)
      const user = ctx.formatFields(tokenRes, tokenRaw)
      ctx.body = ctx.resuccess({
        ...user,
        isLogin: true,
        token
      })
    } catch (err) {
      ctx.body = ctx.resuccess({
        isLogin: false
      })
    }
  } else {
    ctx.body = ctx.resuccess({
      isLogin: false
    })
  }
}

/**
 * 退出登录
 * @param ctx
 * @returns {Promise<void>}
 */
exports.logout = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      token: { required: false, type: 'string' },
      platform: { required: true, type: 'string' }
    }, query)
    const tokenRaw = ctx.token.verify(data.token)
    const userRaw = await ctx.services.user.getUserByName(tokenRaw.name)
    // 添加退出登录日志
    ctx.services.log.addLogAudit({
      log_type: 'logout',
      platform: data.platform,
      user_id: userRaw._id,
      user_name: userRaw.name
    })
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getVerificationCodeToken = async function (ctx) {
  try {
    const res = await ctx.services.log.addVerificationCodeToken()
    // 发送次数客户端也需要验证
    ctx.body = ctx.resuccess(res)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.sendVerificationCode = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      token: { required: true, type: 'string' },
      mobile: { required: true, type: 'string' },
      source_channel_id: { required: true, type: 'string' }
    }, query)
    const realChannel = await ctx.services.channel.getRealChannel(data)
    data.source_channel_id = realChannel._id
    const res = await ctx.services.auth.sendVerificationCode(data)
    // 发送次数客户端也需要验证
    ctx.body = ctx.resuccess(res)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.activeByVerificationCode = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      code: { required: true, type: 'string' },
      mobile: { required: true, type: 'string' },
      source_channel_id: { required: true, type: 'string' }
    }, query)
    const realChannel = await ctx.services.channel.getRealChannel(data)
    data.source_channel_id = realChannel._id
    await ctx.services.auth.activeByVerificationCode(data)
    // 发送次数客户端也需要验证
    const keepDay = 30
    const user = {
      mobile: data.mobile,
      channel_name: realChannel.channel_name,
      channel_id: realChannel._id
    }
    const token = ctx.token.sign(user, 60 * 60 * 24 * keepDay)
    // 添加登录日志
    ctx.body = ctx.resuccess({
      ...user,
      token
    })
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
