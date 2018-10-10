let Config = require('./config/index')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? `${Config.baseUrl_production}/` : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:6969',
        changeOrigin: true,
        pathRewrite (path) {
          return path.replace('/api', '')
        },
        onOpen (proxySocket) {
        /* eslint-disable-next-line */
          console.log('proxySocket')
          proxySocket.on('data', (chunk) => {
        /* eslint-disable-next-line */
            console.log(chunk)
          })
        }
      }
    }
  }
}