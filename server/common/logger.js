let winston = require('winston')
let expressWinston = require('express-winston')
require('winston-daily-rotate-file')
let appRoot = require('app-root-path')
const moment = require('moment')

let DailyRotateFileTransport = (fileName) => {
  return new(winston.transports.DailyRotateFile)({
    filename: `${appRoot}/log/${fileName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '10d',
    handleExceptions: true,
    timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss')
  })
}

// let pageRequestLogger = expressWinston.logger({
//   transports: [
//     DailyRotateFileTransport('page-request')
//   ],
//   meta: true, // optional: control whether you want to log the meta data about the request (default to true)
//   msg: `[ ${moment().format('YYYY-MM-DD HH:mm:ss')} ] HTTP {{req.method}} {{req.url}}`, // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//   expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//   colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//   ignoreRoute: function (req, res) {
//     // 只打印页面请求信息
//     let notPageRequest = false
//     let ignoreArr = ['.js', '.css', '.png', '.jpg', '.gif']
//     ignoreArr.forEach(item => {
//       if (req.url.indexOf(item) > -1) notPageRequest = true
//     })
//     if (req.method !== 'GET') notPageRequest = true
//     return notPageRequest
//   } // optional: allows to skip some log messages based on request and/or response
// })

let apiRequestLogger = (req, res, next) => {
  let send = res.send
  let content = ''
  let query = req.query || {}
  let body = req.body || {}
  res.send = function () {
    content = arguments[0]
    send.apply(res, arguments)
  }
  expressWinston.logger({
    transports: [
      DailyRotateFileTransport('api-request')
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg() {
      return `[ ${moment().format('YYYY-MM-DD HH:mm:ss')} ] HTTP ${req.method} ${req.url} query ${JSON.stringify(query)} body ${JSON.stringify(body)} resData ${content} `
    },
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      // 只打印页面请求信息
      let notPageRequest = false
      let ignoreArr = ['.js', '.css', '.png', '.jpg', '.gif']
      ignoreArr.forEach(item => {
        if (req.url.indexOf(item) > -1) notPageRequest = true
      })
      if (req.headers.self) notPageRequest = true
      // if (req.method === 'GET') return true
      return notPageRequest
    } // optional: allows to skip some log messages based on request and/or response
  })(req, res, next)
}

const errorLogger = winston.createLogger({
  level: 'info',
  exitOnError: false,
  transports: [
    new winston.transports.File({
      filename: `${appRoot}/log/error.log`,
      level: 'error',
      json: true,
      colorize: false,
      handleExceptions: true,
      maxsize: 1024 * 1024 * 20, // 20MB
      maxFiles: 10,
    }),
  ]
})
if (process.env.NODE_ENV !== 'production') {
  errorLogger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

module.exports = {
  DailyRotateFileTransport,
  // pageRequestLogger,
  apiRequestLogger,
  errorLogger
}