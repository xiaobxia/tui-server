// 注册页浏览日志
exports.registerViewLog = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      device_id: {required: true, type: 'string'},
      channel_id: {required: true, type: 'string'},
      device_type: {required: true, type: 'string'},
      province: { required: false, type: 'string'},
      city: {required: false, type: 'string'}
    }, query)
    // 添加进游客库
    await ctx.services.log.addVisitorLog(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
