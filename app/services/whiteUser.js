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

exports.getWhiteUsers = async function (paging) {
  const opt = {
    skip: paging.start,
    limit: paging.offset
  }
  const fetchData = await Promise.all([
    WhiteUserProxy.find({}, opt),
    WhiteUserProxy.count({})
  ])
  const users = fetchData[0]
  return { list: users, count: fetchData[1] }
}
