let Config = require('../../config/index')
const proxyPath = process.env.process.env.NODE_ENV === 'production' ? `${Config.baseUrl_production}/api` : '/api'

export default {
  proxyPath
}