exports.getCustomers = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      source_channel_id: { type: 'string', required: false },
      status: { type: 'int', required: false },
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const customers = await ctx.services.user.getCustomers(data, paging)
    ctx.body = ctx.resuccess(customers)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.setDownload = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      mobile: { type: 'int', required: true }
    }, query)
    await ctx.services.user.setDownload(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.setHasApp = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      mobile: { type: 'int', required: true }
    }, query)
    await ctx.services.user.setHasApp(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
