const Proxy = require('../proxy')

const WhiteUserProxy = Proxy.WhiteUser

exports.addWhiteUser = async function (data) {
  return WhiteUserProxy.newAndSave(data)
}
