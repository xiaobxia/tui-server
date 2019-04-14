exports.addWhiteUser = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true },
      name: { type: 'string', required: false },
      true_name: { type: 'string', required: false },
      gender: { type: 'number', required: false },
      id_card: { type: 'string', required: false },
      region_code: { type: 'string', required: false },
      address: { type: 'string', required: false },
      contact_name: { type: 'string', required: false },
      contact_mobile: { type: 'string', required: false },
      contact_relation_ship: { type: 'string', required: false },
      wechat_number: { type: 'string', required: false },
      qq_number: { type: 'string', required: false },
      education_type: { type: 'string', required: false },
      zhima_score: { type: 'string', required: false }
    }, query)
    await ctx.services.whiteUser.addWhiteUser(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addClickCount = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true }
    }, query)
    await ctx.services.whiteUser.addClickCount(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getWhiteUsers = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      if_contact: { type: 'string', required: false }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.whiteUser.getWhiteUsers(data, paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
