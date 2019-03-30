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
