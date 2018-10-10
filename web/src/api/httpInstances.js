
import axios from 'axios'
import config from '@/config'

const httpInstances = axios.create({
  baseURL: `${location.origin}${config.proxyPath}/`
})
httpInstances.interceptors.request.use((config) => {
  config.rqTime = Date.now()
  return config
})
httpInstances.interceptors.response.use((response) => {
  // console.log('response', response.headers, response)
  return new Promise((resolve, reject) => {
    const result = response.data
    // const header = response.data._head
    if (result.ret && Number(result.ret) !== 0) {
      return reject(result.retinfo || '后台开小差～')
    }
    resolve(result.data)
  })
}, (error) => {
  return Promise.reject(error.message ? error.message : '网络异常！')
})
export default httpInstances
