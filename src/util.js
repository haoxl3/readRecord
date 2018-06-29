// 工具函数库
import config from './config'
export function get (url) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  return request(url, 'POST', data)
}

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        /*eslint-disable*/
        if (res.data.code == 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
