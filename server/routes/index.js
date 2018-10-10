const express = require('express') 
const router = express.Router() 
const path = require('path') 
const multer = require('multer') 
const pug = require('pug') 
const fs = require('fs')
const ZIP = require('../common/zip.js')
const config = require('../common/config.js')
const UPLOAD = require('../common/upload.js')
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.uploadPath)
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
let upload = multer({ storage: storage }) 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }) 
}) 

//其它接口
/**图片上传 */
router.post('/uploadImage', upload.array('imgfile', 40), function(req, res, next) {
  try {
    let files = req.files
    // console.log(files)
    if (!files[0]) {
      throw new Error('找不到上传图片~')
    } else {
      res.send({
        ret: 0,
        retinfo: 'success',
        data: files.map(i => i.filename)
      })
    }
  } catch (err) {
    res.send({
      ret: 1,
      retinfo: err.message
    })
    next(err)
  }
  
}) 
/**页面生成 */
router.post('/createPage', function(req, res, next) {
  try {
    // console.log(req.body)
    let rqBody = req.body
    if (rqBody) {
      let compiledHtml = ''
      let compiledError = ''
      pug.renderFile(path.join(__dirname,'../views/createH5.pug'), rqBody, (error, html) => {
        if (error) {
          // console.log(error)
          compiledError = error
        } else if (html) {
          compiledHtml = html
        }
      })
      // console.log(compiledError)
      // console.log(compiledHtml)
      if (compiledError) {
        // res.send({
        //   ret: 1,
        //   retinfo: compiledError.msg
        // })
        throw compiledError
      }
      let fileName = `active_${Date.now()}.html`
      fs.writeFile(`${config.uploadPath}/${fileName}`, compiledHtml, (error) => {
        if (error) {
          throw error
        }
        let sources = [
          fileName,
          ...rqBody.list
        ]
        res.send({
          ret: 0,
          retinfo: 'success',
          data: {
            fileName,
            sources,
            visitPath: `/${fileName}` 
          }
        })
      })
    } else {
      throw new Error('参数缺失')
    }
  } catch (err) {
    res.send({
      ret: 1,
      retinfo: err.message
    })
    next(err)
  }
}) 
/**获取页面资源 */
router.post('/getSources', function(req, res, next){
  try {
    // console.log(req.body)
    let rqBody = req.body
    if (rqBody && rqBody.length > 0) {
      zipFileName = `${Date.now()}.zip`
      ZIP.zip({
        zipPath: `${config.uploadPath}/${zipFileName}`,
        targetList: rqBody.map(fileName => `${config.uploadPath}/${fileName}`),
        next () {
          res.send({
            ret: 0,
            retinfo: 'success',
            data: {
              visitPath: `/${zipFileName}`
            }
          })
        }
      })
    } else {
      throw new Error('参数缺失')
    }
  } catch (err) {
    res.send({
      ret: 1,
      retinfo: err.message
    })
    next(err)
  }
})
/*将生成的文件上传至目标服务器（腾讯云）*/
router.post('/publish', function(req, res, next){
  try {
    // console.log(req.body)
    let rqBody = req.body
    if (rqBody && rqBody.length > 0) {
      UPLOAD.all(rqBody)
      .then(rs => {
        res.send({
          ret: 0,
          retinfo: 'success',
          data: {
            visitPath: rs.find(i => i.includes('.html'))
          }
        })
      })
      .catch(err => {
        throw err
      })
    } else {
      throw new Error('参数缺失')
    }
  } catch (err) {
    res.send({
      ret: 1,
      retinfo: err.message
    })
    next(err)
  }
})
module.exports = router
