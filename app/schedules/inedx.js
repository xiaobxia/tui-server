const env = process.env.NODE_ENV
const isDev = env === 'dev'
if (!isDev) {
  exports.updateProduct = require('./updateProduct')
}
