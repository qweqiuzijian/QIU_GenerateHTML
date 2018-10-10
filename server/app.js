let createError = require('http-errors') 
let express = require('express') 
let path = require('path') 
let cookieParser = require('cookie-parser') 
// let logger = require('morgan') 
let fs = require('fs')
const moment = require('moment')
let Logger = require('./common/logger')

// let rfs = require('rotating-file-stream')

let indexRouter = require('./routes/index') 
let usersRouter = require('./routes/users') 

let app = express() 

// view engine setup
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'pug') 

// ensure log directory exists
var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// setup the logger
// app.use(logger('combined', { stream: accessLogStream, skip (req, res) { return res.statusCode < 400 } }))
// app.use(logger('combined', { stream: accessLogStream}))
// app.use(logger('combined', {
//   stream: winston.stream,
//   skip (req, res) {
//     return req.method === 'GET'
//   }
// }))

app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 
app.use(cookieParser())

// app.use(Logger.pageRequestLogger)
app.use(Logger.apiRequestLogger)

app.use(express.static(path.join(__dirname, 'public'))) 
app.use(express.static(path.join(__dirname, 'uploads'))) 


app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
}) 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message 
  res.locals.error = req.app.get('env') === 'development' ? err : {} 

  // add this line to include winston logging
  Logger.errorLogger.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] - ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  // render the error page
  res.status(err.status || 500) 
  res.render('error') 
}) 

module.exports = app 
