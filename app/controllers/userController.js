exports.getAdminUsers = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.user.getAdminUsers(paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addAdminUser = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
      roles: { type: 'string', required: true }
    }, query)
    await ctx.services.user.addAdminUser(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.updateAdminUser = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      name: { type: 'string', required: true },
      password: { type: 'string', required: false },
      roles: { type: 'string', required: false },
      status: { type: 'int', required: false }
    }, query)
    await ctx.services.user.updateAdminUser(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.deleteAdminUser = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      user_id: { type: 'string', required: true }
    }, query)
    await ctx.services.user.deleteAdminUser(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
/**
 * 修改登录密码
 * @param ctx
 * @returns {Promise<void>}
 */
exports.newPassword = async function (ctx) {
  const query = ctx.request.body
  try {
    const tokenRaw = ctx.tokenRaw
    const data = ctx.validateData({
      oldPassword: { required: true, type: 'string' },
      newPassword: { required: true, type: 'string' }
    }, query)
    const userRaw = await ctx.services.user.getUserByName(tokenRaw.name)
    await ctx.services.user.newPassword({
      name: userRaw.name,
      ...data
    })
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
