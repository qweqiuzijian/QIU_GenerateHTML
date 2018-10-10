const path = require('path')
const fs = require('fs')

const uploadDirectory = path.join(__dirname, '../uploads') // 临时文件目录
const M = {
  'uploadPath': uploadDirectory
}

fs.existsSync(uploadDirectory) || fs.mkdirSync(uploadDirectory)

let timer = 1000 * 60 * 60 * 12// 定时时间

setInterval(() => { // 定时任务，清除临时文件
  const delay = 1000 * 60 * 60 * 12
  fs.readdir(uploadDirectory, (err, files) => {
    files.forEach(fileName => {
      let fileCreateTime = parseInt(fileName.split('.')[0].split('_').find(i => !isNaN(i)))
      if (Date.now() >= fileCreateTime + delay) {
        const curPath = `${uploadDirectory}/${fileName}`
        fs.unlink(curPath, () => {})
      }
    })
  })
}, timer)

module.exports = M