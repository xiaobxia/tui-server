// 注册页浏览日志
exports.registerViewLog = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      device_id: { required: true, type: 'string' },
      source_channel_id: { required: true, type: 'string' },
      device_type: { required: true, type: 'string' }
    }, query)
    // 添加进游客库
    await ctx.services.log.addVisitorLog(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getRegisterViewLog = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' },
      device_id: { required: false, type: 'string' },
      source_channel_id: { required: false, type: 'string' },
      device_type: { required: false, type: 'string' }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const visitorLogs = await ctx.services.log.getVisitorLog(data, paging)
    ctx.body = ctx.resuccess(visitorLogs)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
