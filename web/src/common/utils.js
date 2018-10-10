export const copy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const downLoad = (url) => {
  let node  = document.createElement('a')
  node.setAttribute('href', url)
  node.setAttribute('download', '')
  node.click()
  node = ''
}
