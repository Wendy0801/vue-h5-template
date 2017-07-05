let reqUrl = ''
var env = process.env.NODE_ENV




const VERSION = 'V1'
if (env === 'development') { // 本地调试接口
  reqUrl = `http://192.168.68.23:30001/api/${VERSION}/`
}
else if (env === 'production') {  // 线上接口
  reqUrl = `http://api.fans.smi170.com/api/${VERSION}/`
}

export const API_ROOT = reqUrl
export const CONTENT_TYPE = 'application/x-www-form-urlencoded'
