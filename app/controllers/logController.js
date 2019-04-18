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
    const realChannel = await ctx.services.channel.getRealChannel(data)
    data.source_channel_id = realChannel._id
    await ctx.services.user.addViewCount(data)
    ctx.body = ctx.resuccess()
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
      mobile: { required: true, type: 'string' },
      source_channel_id: { required: false, type: 'string' }
    }, query)
    // 添加进游客库， 没必要等待
    const realChannel = await ctx.services.channel.getRealChannel(data)
    data.source_channel_id = realChannel._id
    await ctx.services.channel.addChannelClickCount(data)
    ctx.services.product.addProductClickLog(data)
    ctx.services.user.addClickCount(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
