const api = require('../api/index.js')
const needle = require('needle')
const CONFIG = require('./config.js')
const { URL } = require('url')
const fs = require('fs')

module.exports = {
  async _getSigin (rqParams) {
    let rs = await api.getSigin(rqParams)
    return rs
  },
  async _upload ({url, signature, fileName, config={}}) {
    config = Object.assign({
      multipart: true,
      headers: {
        'Authorization': signature
      }
    }, config)
    let filePath = `${CONFIG.uploadPath}/${fileName}`
    let params = {
      op: 'upload',
      filecontent: fs.readFileSync(filePath),
      content_type: 'application/octet-stream',
    }
    return new Promise((resolve, reject) => {
      needle.post(url, params, config, (err, resp) => {
        if (err) {
          reject(err)
          return
        }
        // console.log('resp', resp.body)
        let d = resp.body.data
        if (typeof d !== 'object') {
          reject(new Error('data is no object!'))
          return
        }
        if (!d.access_url) {
          reject(new Error('access_url is not exist!'))
          return
        }
        const myURL = new URL(d.access_url)
        let {protocol, pathname} = myURL
        myURL.href = protocol === 'https' ? `https://s1.huishoubao.com${pathname}` : `http://s1.huishoubao.com${pathname}`
        resolve(myURL.href)
      })
    })
  },
  async go ({fileName}) {
    let rs = await this._getSigin({fileName})
    let href = await this._upload({
      url: rs.url,
      signature: rs.signature,
      fileName
    })
    return href
  },
  async all (fileNames) {
    if (!fileNames || fileNames.length === 0) throw new Error('至少输入1个文件名')
    if (fileNames.length === 1) {
      return await this.go({fileName: fileNames[0]})
    }
    let list = fileNames.map(async fileName => {
      return await this.go({fileName})
    })
    let rs = []
    for(let i = 0; i < list.length; i++) {
      let href = await list[i]
      href && rs.push(href)
    }
    return rs
  }
}