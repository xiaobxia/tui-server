const Proxy = require('../proxy')
const moment = require('moment')

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
    let activeDays = user.active_days || 0
    // 不是同一天，说明在新的一天活跃了
    if (!moment().isSame(user.active_at, 'day')) {
      activeDays++
    }
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      ...data,
      active_at: Date.now(),
      source: newSource,
      active_days: activeDays
    })
  } else {
    return WhiteUserProxy.newAndSave({
      ...data,
      active_at: Date.now(),
      register_at: Date.now()
    })
  }
}

exports.addRegisterUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      active_at: Date.now(),
      register_at: Date.now()
    })
  } else {
    return WhiteUserProxy.newAndSave({
      mobile: data.mobile,
      active_at: Date.now(),
      register_at: Date.now()
    })
  }
}

exports.addTrueNameUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    let activeDays = user.active_days || 0
    // 不是同一天，说明在新的一天活跃了
    if (!moment().isSame(user.active_at, 'day')) {
      activeDays++
    }
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      if_true_name: true,
      active_at: Date.now(),
      source: 'xjd',
      true_name_at: Date.now(),
      active_days: activeDays
    })
  } else {
    return WhiteUserProxy.newAndSave({
      mobile: data.mobile,
      if_true_name: true,
      active_at: Date.now(),
      source: 'xjd',
      true_name_at: Date.now(),
      register_at: Date.now()
    })
  }
}

exports.serverAddDownUserSp = async function (data) {
  const mobileList = JSON.parse(data.m)
  const nameList = JSON.parse(data.u)
  const dayList = JSON.parse(data.d)
  let opList = []
  for (let i = 0; i < mobileList.length; i++) {
    // 有时间的
    if (dayList[i] && nameList[i]) {
      const user = await WhiteUserProxy.findOne({
        mobile: mobileList[i]
      })
      if (user) {
        const mobile = mobileList[i]
        let activeDays = user.active_days || 0
        // 不是同一天，说明在新的一天活跃了
        if (!moment().isSame(user.active_at, 'day')) {
          activeDays++
        }
        opList.push(WhiteUserProxy.update({
          mobile: mobile
        }, {
          if_down: true,
          active_at: Date.now(),
          source: 'xjd',
          down_at: dayList[i],
          active_days: activeDays,
          name: nameList[i]
        }))
      } else {
        opList.push(WhiteUserProxy.newAndSave({
          mobile: mobileList[i],
          if_down: true,
          active_at: Date.now(),
          source: 'xjd',
          name: nameList[i],
          down_at: dayList[i],
          register_at: Date.now()
        }))
      }
    }
  }
  return Promise.all(opList)
}

exports.serverAddBackUserSp = async function (data) {
  const mobileList = JSON.parse(data.m)
  const nameList = JSON.parse(data.u)
  const dayList = JSON.parse(data.d)
  let opList = []
  for (let i = 0; i < mobileList.length; i++) {
    if (dayList[i] && nameList[i]) {
      const user = await WhiteUserProxy.findOne({
        mobile: mobileList[i]
      })
      if (user) {
        const mobile = mobileList[i]
        let activeDays = user.active_days || 0
        // 不是同一天，说明在新的一天活跃了
        if (!moment().isSame(user.active_at, 'day')) {
          activeDays++
        }
        opList.push(WhiteUserProxy.update({
          mobile: mobile
        }, {
          if_back: true,
          active_at: Date.now(),
          source: 'xjd',
          back_at: dayList[i],
          active_days: activeDays,
          name: nameList[i]
        }))
      } else {
        opList.push(WhiteUserProxy.newAndSave({
          mobile: mobileList[i],
          if_back: true,
          active_at: Date.now(),
          source: 'xjd',
          name: nameList[i],
          back_at: dayList[i],
          register_at: Date.now()
        }))
      }
    }
  }
  return Promise.all(opList)
}

exports.addDownUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    let activeDays = user.active_days || 0
    // 不是同一天，说明在新的一天活跃了
    if (!moment().isSame(user.active_at, 'day')) {
      activeDays++
    }
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      if_down: true,
      active_at: Date.now(),
      source: 'xjd',
      down_at: Date.now(),
      active_days: activeDays
    })
  } else {
    return WhiteUserProxy.newAndSave({
      mobile: data.mobile,
      if_down: true,
      active_at: Date.now(),
      source: 'xjd',
      down_at: Date.now(),
      register_at: Date.now()
    })
  }
}

exports.addBackUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    let activeDays = user.active_days || 0
    // 不是同一天，说明在新的一天活跃了
    if (!moment().isSame(user.active_at, 'day')) {
      activeDays++
    }
    return WhiteUserProxy.update({
      mobile: mobile
    }, {
      if_back: true,
      back_at: Date.now(),
      active_at: Date.now(),
      source: 'xjd',
      active_days: activeDays
    })
  } else {
    return WhiteUserProxy.newAndSave({
      mobile: data.mobile,
      if_back: true,
      active_at: Date.now(),
      source: 'xjd',
      back_at: Date.now(),
      register_at: Date.now()
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

exports.getDownUsers = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: {
      down_at: -1
    }
  }
  let queryOption = {
    if_down: true
  }
  if (query.mobile) {
    queryOption.mobile = query.mobile
  }
  if (query.beginTime) {
    queryOption.down_at = {
      $gte: query.beginTime,
      $lt: query.endTime
    }
  }
  const fetchData = await Promise.all([
    WhiteUserProxy.find(queryOption, opt),
    WhiteUserProxy.count(queryOption)
  ])
  const users = fetchData[0]
  return { list: users, count: fetchData[1] }
}

exports.getBackUsers = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    // 点击数多的靠前
    sort: {
      back_at: -1
    }
  }
  let queryOption = {
    if_back: true
  }
  if (query.mobile) {
    queryOption.mobile = query.mobile
  }
  if (query.beginTime) {
    queryOption.back_at = {
      $gte: query.beginTime,
      $lt: query.endTime
    }
  }
  const fetchData = await Promise.all([
    WhiteUserProxy.find(queryOption, opt),
    WhiteUserProxy.count(queryOption)
  ])
  const users = fetchData[0]
  return { list: users, count: fetchData[1] }
}

exports.getTodayRegisterUsers = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: {
      register_at: -1
    }
  }
  let queryOption = {
    'if_down': false,
    'if_back': false
  }
  const start = moment(moment().format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  const end = moment(moment().add(1, 'days').format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  queryOption.register_at = {
    $gte: start,
    $lt: end
  }
  const fetchData = await Promise.all([
    WhiteUserProxy.find(queryOption, opt),
    WhiteUserProxy.count(queryOption)
  ])
  const users = fetchData[0]
  return { list: users, count: fetchData[1] }
}

exports.getTodayBackUsers = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    sort: {
      back_at: -1
    }
  }
  let queryOption = {
    if_back: true
  }
  const start = moment(moment().format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  const end = moment(moment().add(1, 'days').format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  queryOption.back_at = {
    $gte: start,
    $lt: end
  }
  const fetchData = await Promise.all([
    WhiteUserProxy.find(queryOption, opt),
    WhiteUserProxy.count(queryOption)
  ])
  const users = fetchData[0]
  return { list: users, count: fetchData[1] }
}

exports.getWhiteUsersByStart = async function (query) {
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
    skip: query.start,
    limit: query.offset,
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
  if (query.active_days) {
    queryOption.active_days = {
      $gte: query.active_days
    }
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
  if (query.beginTimeB) {
    queryOption.back_at = {
      $gte: query.beginTimeB,
      $lt: query.endTimeB
    }
  }
  if (query.beginTimeR) {
    queryOption.register_at = {
      $gte: query.beginTimeR,
      $lt: query.endTimeR
    }
  }
  if (query.beginTimeD) {
    queryOption.down_at = {
      $gte: query.beginTimeD,
      $lt: query.endTimeD
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

exports.getTodayCount = async function () {
  let startDay = moment(moment().format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  let endDay = moment(moment().add(1, 'days').format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
  const fetchData = await Promise.all([
    // 今日A料
    WhiteUserProxy.count({
      'register_at': {
        $gte: startDay,
        $lt: endDay
      },
      'if_down': false,
      'if_back': false
    }),
    // 今日现金贷A料
    WhiteUserProxy.count({
      'register_at': {
        $gte: startDay,
        $lt: endDay
      },
      source: 'xjd',
      'if_down': false,
      'if_back': false
    }),
    // 今日贷超A料
    WhiteUserProxy.count({
      'register_at': {
        $gte: startDay,
        $lt: endDay
      },
      source: 'dc'
    }),
    // 今日下款
    WhiteUserProxy.count({
      'down_at': {
        $gte: startDay,
        $lt: endDay
      },
      source: 'xjd'
    }),
    // 今日回款
    WhiteUserProxy.count({
      'back_at': {
        $gte: startDay,
        $lt: endDay
      },
      source: 'xjd'
    })
  ])
  return {
    dayR: fetchData[0],
    dayRX: fetchData[1],
    dayRD: fetchData[2],
    dayDX: fetchData[3],
    dayBX: fetchData[4]
  }
}

exports.initTrueName = async function () {
  const users = await WhiteUserProxy.find({
    source: 'xjd'
  })
  let opList = []
  for (let i = 0; i < users.length; i++) {
    opList.push(WhiteUserProxy.update({
      mobile: users[i].mobile
    }, {
      if_true_name: true
    }))
  }
  return Promise.all(opList)
}
