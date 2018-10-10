const httpInstance = require('./http.js')
const md5 = require('blueimp-md5')
const hsbInterface = async ({url='', params={}, config={}}) => {
  let rs = await httpInstance.post(url, params, config)
  let data = rs._data
  if (data && data._ret !== '0') {
    throw new Error(data._errStr)
  }
  return data.data
}
module.exports =  {
  getSigin (params) {
    let url = 'https://filestorage.huishoubao.com/upload/getSign'
    let [secret, serviceId] = ['77a131e7f8e20b03c5ce44f44cb5fa17', '111001']
    params = {
      "_head": {
        "_version": "0.01",
        "_remark": "test",
        "_msgType": "request",
        "_interface": "getSign",
        "_timestamps" : Date.now().toString().substr(0 ,10),
        "_invokeId" : "123",
        '_callerServiceId': serviceId,
        "_groupNo" : "333"
      },
      "_param": Object.assign({
        "path": "/hjx/order",
        "customPath": "/h5/",
        "uploadWay": "tencentUpload"
      }, params)
    }
    let signature = md5(`${JSON.stringify(params)}_${secret}`).toLowerCase()
    // console.log('signature', signature)
    // console.log('--------------------------')
    let headers = {
      'HSB-OPENAPI-CALLERSERVICEID': serviceId,
      'HSB-OPENAPI-SIGNATURE': signature
    }
    
    return hsbInterface({url, params, config:{
      headers 
    }})
  },
  upload ({signature='', url='', params={}, boundary}) {
    let headers = {
      'Content-Type': `multipart/form-data;boundary=${boundary}`,
      'Authorization': signature
    }
    params = Object.assign(params, {
      op: 'upload',
      // insertOnly: '0'
    })
    return httpInstance.post(url, params, {
      headers 
    })
  }
}