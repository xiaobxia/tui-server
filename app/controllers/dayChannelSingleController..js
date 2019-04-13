exports.getDayChannelSingles = async function (ctx) {
  const query = ctx.query
  try {
    const tokenRaw = ctx.tokenRaw
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const res = await ctx.services.dayChannelSingle.getDayChannelSingles({
      user: tokenRaw._id,
      ...data
    }, paging)
    const list = []
    res.list.map((item) => {
      list.push({
        channel_id: item.channel_id,
        channel_name: item.channel_name,
        day: item.day,
        register_count: item.register_count_c
      })
    })
    res.list = list
    ctx.body = ctx.resuccess(res)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
