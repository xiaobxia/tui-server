const Proxy = require('../proxy')

const WhiteUserProxy = Proxy.WhiteUser

exports.addWhiteUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    let newSource = 'dc'
    // 如果被标记为现金贷用户了，就不再改回贷超用户
    if (user.source === 'xjd' || data.source === 'xjd') {
      newSource = 'xjd'
    }
    const mobile = data.mobile
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      ...data,
      active_at: Date.now(),
      source: newSource
    })
  } else {
    return WhiteUserProxy.newAndSave({
      ...data,
      active_at: Date.now()
    })
  }
}

exports.addForceUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      // 更新注册时间
      create_at: Date.now(),
      active_at: Date.now()
    })
  } else {
    return WhiteUserProxy.newAndSave({
      mobile: data.mobile,
      active_at: Date.now()
    })
  }
}

exports.addTrueNameUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      if_true_name: true,
      // 更新注册时间
      create_at: Date.now(),
      active_at: Date.now(),
      source: 'xjd'
    })
  } else {
    return WhiteUserProxy.newAndSave({
      mobile: data.mobile,
      if_true_name: true,
      active_at: Date.now(),
      source: 'xjd'
    })
  }
}

exports.addDownUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      if_down: true,
      // 更新注册时间
      create_at: Date.now(),
      active_at: Date.now(),
      source: 'xjd'
    })
  } else {
    return WhiteUserProxy.newAndSave({
      mobile: data.mobile,
      if_down: true,
      active_at: Date.now(),
      source: 'xjd'
    })
  }
}

exports.addBackUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      if_back: true,
      // 更新注册时间
      create_at: Date.now(),
      active_at: Date.now(),
      source: 'xjd'
    })
  } else {
    return WhiteUserProxy.newAndSave({
      mobile: data.mobile,
      if_back: true,
      active_at: Date.now(),
      source: 'xjd'
    })
  }
}

exports.getWhiteUsers = async function (query, paging) {
  let sort = {
    create_at: -1
  }
  if (query.sort === 'source') {
    sort = {
      source: -1,
      create_at: -1
    }
  }
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    // 点击数多的靠前
    sort: sort
  }
  let queryOption = {}
  if (query.source) {
    queryOption.source = query.source
  }
  if (query.mobile) {
    queryOption.mobile = query.mobile
  }
  if (query.if_true_name === 'true') {
    queryOption.if_true_name = true
  } else if (query.if_true_name === 'false') {
    queryOption.if_true_name = false
  }
  if (query.if_down === 'true') {
    queryOption.if_down = true
  } else if (query.if_down === 'false') {
    queryOption.if_down = false
  }
  if (query.if_back === 'true') {
    queryOption.if_back = true
  } else if (query.if_back === 'false') {
    queryOption.if_back = false
  }
  if (query.beginTime) {
    queryOption.create_at = {
      $gte: query.beginTime,
      $lt: query.endTime
    }
  }
  if (query.beginTimeA) {
    queryOption.active_at = {
      $gte: query.beginTimeA,
      $lt: query.endTimeA
    }
  }
  const fetchData = await Promise.all([
    WhiteUserProxy.find(queryOption, opt),
    WhiteUserProxy.count(queryOption)
  ])
  const users = fetchData[0]
  return { list: users, count: fetchData[1] }
}

exports.getWhiteUsersAll = async function (query) {
  const opt = {
    sort: {
      create_at: -1
    }
  }
  let queryOption = {}
  if (query.source) {
    queryOption.source = query.source
  }
  if (query.if_true_name === 'true') {
    queryOption.if_true_name = true
  } else if (query.if_true_name === 'false') {
    queryOption.if_true_name = false
  }
  if (query.if_down === 'true') {
    queryOption.if_down = true
  } else if (query.if_down === 'false') {
    queryOption.if_down = false
  }
  if (query.if_back === 'true') {
    queryOption.if_back = true
  } else if (query.if_back === 'false') {
    queryOption.if_back = false
  }
  if (query.beginTime) {
    queryOption.create_at = {
      $gte: query.beginTime,
      $lt: query.endTime
    }
  }
  if (query.beginTimeA) {
    queryOption.active_at = {
      $gte: query.beginTimeA,
      $lt: query.endTimeA
    }
  }
  const fetchData = await Promise.all([
    WhiteUserProxy.find(queryOption, opt),
    WhiteUserProxy.count(queryOption)
  ])
  const users = fetchData[0]
  return { list: users, count: fetchData[1] }
}

exports.addClickCount = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      click_count: (user.click_count || 0) + 1
    })
  } else {
    return true
  }
}

exports.deleteWhiteUser = async function (data) {
  return WhiteUserProxy.delete({
    mobile: data.mobile
  })
}
