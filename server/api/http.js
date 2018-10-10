const axios = require('axios')
const httpInstance = axios.create()
httpInstance.interceptors.request.use(function (config) {
  // console.log('config', config)
  // console.log('--------------------------')
  return config
}, function (error) {
  return Promise.reject(error);
})
httpInstance.interceptors.response.use(function (response) {
  // console.log('response', response)
  let rs = response.data
  return rs
}, function (error) {
  return Promise.reject(error)
})
module.exports =  httpInstance