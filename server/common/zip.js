let fs = require('fs')
let archiver = require('archiver')

module.exports = {
  zip ({zipPath='', targetList=[], errorCb='', next=''}) {
    let output = fs.createWriteStream(zipPath)
    let archive = archiver('zip', {
      zlib: {
        level: 9
      }
    })
    output.on('close', function() {
      next && next()
      // console.log(archive.pointer() + ' total bytes')
      // console.log('archiver has been finalized and the output file descriptor has closed.')
    })

    output.on('end', function() {
      // console.log('Data has been drained')
    })

    archive.on('error', function(err){
      errorCb && errorCb(err)
      throw err
    })
    
    archive.pipe(output)

    targetList.forEach(filePath => {
      fileName = filePath.split('/').reverse()[0]
      archive.append(fs.createReadStream(filePath), {
        name: fileName
      })
    })

    archive.finalize()
  }
}