const Proxy = require('../proxy')

const WhiteUserProxy = Proxy.WhiteUser

exports.addWhiteUser = async function (data) {
  const user = await WhiteUserProxy.findOne({
    mobile: data.mobile
  })
  if (user) {
    const mobile = data.mobile
    return WhiteUserProxy.update({
      mobile: mobile
    }, data)
  } else {
    return WhiteUserProxy.newAndSave(data)
  }
}

exports.getWhiteUsers = async function (query, paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset,
    // 点击数多的靠前
    sort: {
      click_count: -1
    }
  }
  let queryOption = {}
  if (query.if_contact === 'true') {
    queryOption.if_contact = true
  } else if (query.if_contact === 'false') {
    queryOption.if_contact = false
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
