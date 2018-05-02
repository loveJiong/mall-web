import axios from 'axios'
console.log(process.env)
let host = ''
switch (process.env.NODE_ENV) {
  case 'development':
    host = 'http://xmall.exrick.cn'
    break
  default:
    host = 'http://xmall.exrick.cn'
    break
}
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
export default {
  fetchGet (url, params = {}) {
    url = `${host}${url}`
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchQuickSearch (url) {
    url = `${host}${url}`
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    url = `${host}${url}`
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
