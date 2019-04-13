exports.addViewLog = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      device_id: { required: true, type: 'string' },
      device_type: { required: true, type: 'string' },
      page: { required: true, type: 'string' },
      source_channel_id: { required: false, type: 'string' },
      mobile: { required: false, type: 'string' }
    }, query)
    // 添加进游客库， 没必要等待
    data.source_channel_id = await ctx.services.channel.getRealChannelId(data)
    await ctx.services.channel.addChannelViewCount(data)
    await ctx.services.log.addVisitorLog(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getViewLog = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' },
      device_id: { required: false, type: 'string' },
      source_channel_id: { required: false, type: 'string' },
      device_type: { required: false, type: 'string' },
      page: { required: false, type: 'string' }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const visitorLogs = await ctx.services.log.getVisitorLog(data, paging)
    ctx.body = ctx.resuccess(visitorLogs)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addUrlClickLog = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      device_id: { required: true, type: 'string' },
      device_type: { required: true, type: 'string' },
      product_id: { required: true, type: 'string' },
      source_channel_id: { required: false, type: 'string' },
      mobile: { required: false, type: 'string' }
    }, query)
    // 添加进游客库， 没必要等待
    data.source_channel_id = await ctx.services.channel.getRealChannelId(data)
    await ctx.services.channel.addChannelClickCount(data)
    await ctx.services.log.addUrlClickLog(data)
    ctx.services.product.addProductClickLog(data)
    ctx.services.user.addClickCount(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getUrlClickLog = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' },
      product_id: { required: false, type: 'string' },
      source_channel_id: { required: false, type: 'string' },
      device_type: { required: false, type: 'string' },
      mobile: { required: false, type: 'string' }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const urlClickLogs = await ctx.services.log.getUrlClickLog(data, paging)
    ctx.body = ctx.resuccess(urlClickLogs)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
