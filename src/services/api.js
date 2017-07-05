import Vue from 'vue'
import axios from 'axios'
import {
  API_ROOT,
  CONTENT_TYPE
} from './config'
const REQUEST = axios.create()
REQUEST.defaults.baseURL = API_ROOT
REQUEST.defaults.headers.post['Content-Type'] = CONTENT_TYPE
// REQUEST.defaults.transformResponse = function (data) {
//   console.log(data)
//   return {};
// }

// 数据加密
import Hashes from 'jshashes'
import cookie from './cookie'

const api = {
  auth() {
    return new Promise((resolve, reject) => {
      if (window.userinfo) {
        resolve(userinfo)
      } else {
        reject('用户未登陆')
      }
    })
  },
  get(data) {
    return this.request('get', data)
  },
  post(data) {
    return this.request('post', data)
  },
  request(method, data) {
    let url = data.ext
    delete data.ext
    let config = {
      url,
      method
    }
    method === 'get' ? Object.assign(config, {
      params: data
    }) : Object.assign(config, {
      data: this.dataStringify(data)
    })
    this.handleWait()
    return REQUEST(config)
      .then(result => this.handleSucc(result))
      .catch(error => this.handleError(error))
  },
  dataStringify(data) {
    var _dataArr = []
    for (var attr in data) {
      _dataArr.push(`${attr}=${data[attr]}`)
    }
    return _dataArr.join('&')
  },
  handleWait() {
    // console.log('请求中..')
  },
  handleSucc(result) {
    // console.log(result)
    // console.log('请求结束..')
    return result.data
  },
  handleError(error) {
    // console.log('请求错误..')
    Vue.prototype.$_showtip('请求错误,请稍后重试', 'error')
    throw {
      msg: '请求错误',
      type: 'user'
    }
  },
  md5(str) {
    var md5Helper = new Hashes.MD5
    var str = md5Helper.hex(str)
    md5Helper = null
    return str
  },
  sha1(str) {
    var sha1Helper = new Hashes.SHA1
    var str = sha1Helper.hex(str)
    sha1Helper = null
    return str
  },
  getLoginSign(salt = '1491967716993', action) {
    var companyKey = cookie.get('companykey') || '0123456789ABCDEF'
    var sha1pwd = cookie.get('sha1pwd')
    var usr = cookie.get('usr')
    var str = this.sha1(salt + sha1pwd + `&action=${action}&usr=${usr}&company-key=${companyKey}`);
    return str
  },
  getSign(salt, data) {
    var allParams = this.dataStringify(data)
    var secret = cookie.get('secret')
    var token = cookie.get('token')
    return this.sha1(salt + secret + token + allParams)
  }
}

export default api