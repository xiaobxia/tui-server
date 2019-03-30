exports.getChannels = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      channel_name: { type: 'string', required: false },
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const channels = await ctx.services.channel.getChannels(data, paging)
    ctx.body = ctx.resuccess(channels)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addChannel = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      channel_name: { type: 'string', required: true },
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    }, query)
    await ctx.services.channel.addChannel(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.deleteChannel = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      channel_id: { type: 'string', required: true }
    }, query)
    await ctx.services.channel.deleteChannel(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
