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
      zhima_score: { type: 'string', required: false },
      source: { type: 'string', required: false }
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
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' },
      beginTimeA: { required: false, type: 'string' },
      endTimeA: { required: false, type: 'string' },
      if_true_name: { required: false, type: 'string' },
      if_down: { required: false, type: 'string' },
      if_back: { required: false, type: 'string' },
      source: { required: false, type: 'string' },
      sort: { required: false, type: 'string' },
      mobile: { required: false, type: 'string' }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.whiteUser.getWhiteUsers(data, paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getBackUsers = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' },
      mobile: { required: false, type: 'string' }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.whiteUser.getBackUsers(data, paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getDownUsers = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true },
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' },
      mobile: { required: false, type: 'string' }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.whiteUser.getDownUsers(data, paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getWhiteUsersByStart = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      start: { type: 'int', required: true },
      offset: { type: 'int', required: true },
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' },
      beginTimeA: { required: false, type: 'string' },
      endTimeA: { required: false, type: 'string' },
      beginTimeB: { required: false, type: 'string' },
      endTimeB: { required: false, type: 'string' },
      beginTimeR: { required: false, type: 'string' },
      endTimeR: { required: false, type: 'string' },
      beginTimeD: { required: false, type: 'string' },
      endTimeD: { required: false, type: 'string' },
      if_true_name: { required: false, type: 'string' },
      if_down: { required: false, type: 'string' },
      if_back: { required: false, type: 'string' },
      source: { required: false, type: 'string' },
      sort: { required: false, type: 'string' },
      mobile: { required: false, type: 'string' },
      active_days: { required: false, type: 'int' }
    }, query)
    const users = await ctx.services.whiteUser.getWhiteUsersByStart(data)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getWhiteUsersAll = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      beginTime: { required: false, type: 'string' },
      endTime: { required: false, type: 'string' },
      beginTimeA: { required: false, type: 'string' },
      endTimeA: { required: false, type: 'string' },
      if_true_name: { required: false, type: 'string' },
      if_down: { required: false, type: 'string' },
      if_back: { required: false, type: 'string' },
      source: { required: false, type: 'string' }
    }, query)
    const users = await ctx.services.whiteUser.getWhiteUsersAll(data)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.deleteWhiteUser = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true }
    }, query)
    await ctx.services.whiteUser.deleteWhiteUser(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addTrueNameUser = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true }
    }, query)
    await ctx.services.whiteUser.addTrueNameUser(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addDownUser = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true }
    }, query)
    await ctx.services.whiteUser.addDownUser(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addBackUser = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true }
    }, query)
    await ctx.services.whiteUser.addBackUser(data)
    ctx.body = ctx.resuccess()
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.addRegisterUserSp = async function (ctx) {
  const query = ctx.request.body
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true },
      source: { type: 'string', required: false }
    }, query)
    let referer = ctx.headers.referer
    let ifDev = false
    if (referer.indexOf('localhost') !== -1 || referer.indexOf('47.110.153.34') !== -1 || referer.indexOf('taodou.domiuo.com') !== -1) {
      ifDev = true
    }
    if (!ifDev) {
      await ctx.services.whiteUser.addRegisterUser(data)
    }
    ctx.type = 'text/javascript'
    ctx.body = ''
  } catch (err) {
    ctx.type = 'text/javascript'
    ctx.body = ''
  }
}

exports.addWhiteUserSp = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true },
      source: { type: 'string', required: false }
    }, query)
    let referer = ctx.headers.referer
    let ifDev = false
    if (referer.indexOf('localhost') !== -1 || referer.indexOf('47.110.153.34') !== -1 || referer.indexOf('taodou.domiuo.com') !== -1) {
      ifDev = true
    }
    if (!ifDev) {
      await ctx.services.whiteUser.addWhiteUser(data)
    }
    ctx.type = 'text/javascript'
    ctx.body = ''
  } catch (err) {
    ctx.type = 'text/javascript'
    ctx.body = ''
  }
}

exports.addTrueNameUserSp = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true }
    }, query)
    let referer = ctx.headers.referer
    let ifDev = false
    if (referer.indexOf('localhost') !== -1 || referer.indexOf('47.110.153.34') !== -1 || referer.indexOf('taodou.domiuo.com') !== -1) {
      ifDev = true
    }
    if (!ifDev) {
      await ctx.services.whiteUser.addTrueNameUser(data)
    }
    ctx.type = 'text/javascript'
    ctx.body = ''
  } catch (err) {
    ctx.type = 'text/javascript'
    ctx.body = ''
  }
}

exports.addDownUserSp = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true }
    }, query)
    let referer = ctx.headers.referer
    let ifDev = false
    if (referer.indexOf('localhost') !== -1 || referer.indexOf('47.110.153.34') !== -1 || referer.indexOf('taodou.domiuo.com') !== -1) {
      ifDev = true
    }
    if (!ifDev) {
      await ctx.services.whiteUser.addDownUser(data)
    }
    ctx.type = 'text/javascript'
    ctx.body = ''
  } catch (err) {
    ctx.type = 'text/javascript'
    ctx.body = ''
  }
}

exports.addBackUserSp = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      mobile: { type: 'string', required: true }
    }, query)
    let referer = ctx.headers.referer
    let ifDev = false
    if (referer.indexOf('localhost') !== -1 || referer.indexOf('47.110.153.34') !== -1 || referer.indexOf('taodou.domiuo.com') !== -1) {
      ifDev = true
    }
    if (!ifDev) {
      await ctx.services.whiteUser.addBackUser(data)
    }
    ctx.type = 'text/javascript'
    ctx.body = ''
  } catch (err) {
    ctx.type = 'text/javascript'
    ctx.body = ''
  }
}

exports.getTodayCount = async function (ctx) {
  try {
    const res = await ctx.services.whiteUser.getTodayCount()
    ctx.body = ctx.resuccess(res)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.initTrueName = async function (ctx) {
  try {
    const res = await ctx.services.whiteUser.initTrueName()
    ctx.body = ctx.resuccess(res)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.serverAddDownUserSp = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      // 手机号
      m: { type: 'string', required: false },
      // 姓名
      u: { type: 'string', required: false },
      // 日期
      d: { type: 'string', required: false }
    }, query)
    let referer = ctx.headers.referer
    let ifDev = false
    if (referer.indexOf('localhost') !== -1 || referer.indexOf('47.110.153.34') !== -1 || referer.indexOf('taodou.domiuo.com') !== -1) {
      ifDev = true
    }
    if (!ifDev) {
      await ctx.services.whiteUser.serverAddDownUserSp(data)
    }
    ctx.type = 'text/javascript'
    ctx.body = ''
  } catch (err) {
    ctx.type = 'text/javascript'
    ctx.body = ''
  }
}

exports.serverAddBackUserSp = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      // 手机号
      m: { type: 'string', required: false },
      // 姓名
      u: { type: 'string', required: false },
      // 日期
      d: { type: 'string', required: false }
    }, query)
    let referer = ctx.headers.referer
    let ifDev = false
    if (referer.indexOf('localhost') !== -1 || referer.indexOf('47.110.153.34') !== -1 || referer.indexOf('taodou.domiuo.com') !== -1) {
      ifDev = true
    }
    if (!ifDev) {
      await ctx.services.whiteUser.serverAddBackUserSp(data)
    }
    ctx.type = 'text/javascript'
    ctx.body = ''
  } catch (err) {
    ctx.type = 'text/javascript'
    ctx.body = ''
  }
}

exports.serverAddRegisterUserSp = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      // 手机号
      m: { type: 'string', required: false },
      // 姓名
      u: { type: 'string', required: false },
      // 日期
      d: { type: 'string', required: false }
    }, query)
    let referer = ctx.headers.referer
    let ifDev = false
    if (referer.indexOf('localhost') !== -1 || referer.indexOf('47.110.153.34') !== -1 || referer.indexOf('taodou.domiuo.com') !== -1) {
      ifDev = true
    }
    if (!ifDev) {
      await ctx.services.whiteUser.serverAddRegisterUserSp(data)
    }
    ctx.type = 'text/javascript'
    ctx.body = ''
  } catch (err) {
    ctx.type = 'text/javascript'
    ctx.body = ''
  }
}

exports.getTodayBackUsers = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.whiteUser.getTodayBackUsers(data, paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getTodayRegisterUsers = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.whiteUser.getTodayRegisterUsers(data, paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getTodayDownUsers = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.whiteUser.getTodayDownUsers(data, paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}

exports.getTodayDownUsersN = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      current: { type: 'int', required: true },
      pageSize: { type: 'int', required: true }
    }, query)
    let paging = ctx.paging(data.current, data.pageSize)
    const users = await ctx.services.whiteUser.getTodayDownUsersN(data, paging)
    ctx.body = ctx.resuccess(users)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
