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
