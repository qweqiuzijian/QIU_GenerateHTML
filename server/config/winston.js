let Logger = require('../common/logger')
let appRoot = require('app-root-path') 
let winston = require('winston') 
const moment = require('moment') 
// define the custom settings for each transport (file, console)
// let options = {
//   file: {
//     level: 'info',
//     filename: `${appRoot}/log/app.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 10,
//     colorize: false,
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// } 

// // instantiate a new Winston Logger with the settings defined above
// let transports = [
//   new winston.transports.File(options.file)
// ]
// // if (process.env.NODE_ENV !== 'production') {
// //   transports.push(new winston.transports.Console(options.console))
// // }
// let logger = winston.createLogger({
//   transports,
//   exitOnError: false, // do not exit on handled exceptions
// })
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }))
// }
// const myFormat = winston.format.printf(info => {
//   return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
// })
const logger = winston.createLogger({
  level: 'info',
  exitOnError: false,
  // format: winston.format.json(),
  // format: winston.format.combine(
  //   winston.format.label({ label: 'right meow!' }),
  //   winston.format.timestamp(),
  //   myFormat,
  // ),
  transports: [
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    new winston.transports.File({
      filename: `${appRoot}/log/error.log`,
      level: 'error',
      json: false,
      colorize: true,
      handleExceptions: true,
      maxsize: 1024 * 1024 * 20, // 20MB
      maxFiles: 10,
    }),
    new winston.transports.File({
      filename: `${appRoot}/log/app.log`,
      handleExceptions: true,
      maxsize: 1024 * 1024 * 20, // 20MB
      maxFiles: 10,
    })
  ]
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message) 
  },
} 

module.exports = logger 
