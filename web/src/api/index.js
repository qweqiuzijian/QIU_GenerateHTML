import http from './http'
export default {
  // Get telphone code
  uploadImage (fileList) {
    let from = new FormData()
    fileList.forEach(i => {
      from.append('imgfile', i)
    })
    return http.fetch({_interface: 'uploadImage', params: from})
  },
  createPage (params) {
    return http.fetch({_interface: 'createPage', params})
  },
  getSources (params) {
    return http.fetch({_interface: 'getSources', params})
  },
  publish (params) {
    return http.fetch({_interface: 'publish', params})
  }
}
