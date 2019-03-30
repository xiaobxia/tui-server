const Proxy = require('../proxy')

const LogAuditProxy = Proxy.LogAudit
const VisitorProxy = Proxy.Visitor

/**
 * 添加日志
 * @param data
 * @returns {Promise<*>}
 */
exports.addLogAudit = async function (data) {
  return LogAuditProxy.newAndSave(data)
}

exports.addVisitorLog = async function (data) {
  return VisitorProxy.newAndSave(data)
}
