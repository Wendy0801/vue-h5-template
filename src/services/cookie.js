const default_expires_minute = 24 * 60 // 默认cookie存储24个小时
const default_offset_timeZone = 8 * 60 // 时区偏移分钟

const cookie = {
  /**
   *
   * @param {*cookie键值式的对象} data
   * @param {*cookie过期时间(分钟为单位),默认为一天(24*60分钟)} expireMinutes
   * @param {*cookie的存储路径,默认为网址当前路径,例如要存在根域名,则传'/'} cookiePath
   * @param {*cookie的存储域名} cookieDomain
   * cookie机制,子域,根域同名cookie可共存,不同路径的cookie可共存不同路径彼此不可见
   */
  set(data, expireMinutes = default_expires_minute, cookiePath, cookieDomain) { // expiresT=> 单位是分钟
    expireMinutes = expireMinutes + default_offset_timeZone
    for (var attr in data) {
      var _cookieValue = data[attr]
      if (typeof _cookieValue === 'object') {
        _cookieValue = JSON.stringify(_cookieValue)
      }
      var _writeCookie = attr + '=' + encodeURIComponent(_cookieValue)
      if (expireMinutes) {
        var date = new Date()
        date.setTime(date.getTime() + expireMinutes * 60 * 1000)
        _writeCookie += (';expires=' + date.toGMTString())
      }
      if (cookiePath) {
        _writeCookie += `;path=${cookiePath}`
      }

      if (cookieDomain) {
        _writeCookie += `;domain=${cookieDomain}`
      }
      document.cookie = _writeCookie
    }
  },
  get(cookieName) {
    if (!cookieName) {
      return null;
    }
    if (document.cookie.indexOf(cookieName) !== -1) {
      var cs = document.cookie.split(';'),
        i = 0,
        len = cs.length;
      for (; i < len; i++) {
        if (cs[i].split('=')[0].trim() === cookieName) {
          return decodeURIComponent(cs[i].split('=')[1]);
        }
      }
    }
    return null;
  },
  clearAll(path, domain) {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = 0; i < keys.length; i++) {
        var keyStr = keys[i]
        var cookieData = {}
        cookieData[keys[i]] = this.getCookie(keys[i])
        this.set(cookieData, -24 * 60, path, domain)
      }
    }
  }
}

export default cookie