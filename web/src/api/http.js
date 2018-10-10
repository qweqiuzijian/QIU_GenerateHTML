import axios from './httpInstances'

let request = function ({_interface, params}) {
  return axios.post(_interface, params)
}

export default {
  fetch ({_interface, params}) {
    return request({_interface, params})
  }
}
