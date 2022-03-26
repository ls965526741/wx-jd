let subDomain = '' // 子域名,没有就等于''
const API_BASE_URL = 'http://localhost:8888/' // 主域名
// const API_BASE_URL = 'https://warm-sheep-39.loca.lt/' // 主域名

const request = (url, method, data) => {
  let _url = API_BASE_URL + subDomain + url
  return new Promise((resolve, reject) => {
    // 是否有token
    const token = wx.getStorageSync('token')
    const header = { 'Content-Type': 'application/json' }
    if (token) {
      header.authorization = `Bearer ${token}`
    }
    // 发送请求
    wx.request({
      url: _url,
      method: method,
      data: data,
      header,
      success(request) {
        console.log(request.data)
        if (request.data.code === 200) {
          resolve(request.data)
        } else {
          resolve()
        }
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

// 小程序的promise没有finally方法，自己扩展下
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(function () {
        return value
      })
    },
    function (reason) {
      Promise.resolve(callback()).then(function () {
        throw reason
      })
    }
  )
}
module.exports = request
