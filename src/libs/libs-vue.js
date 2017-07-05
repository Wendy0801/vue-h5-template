import Vue from 'vue'

Vue.config.productionTip = false

import store from '@/store'
import {
    Indicator,
} from 'mint-ui'


// 所有的自定义添加在vue 原型链上的方法, 统一 用 "$_"开头意做区分
// 操作提示方法
Vue.prototype.$_showtip = function (msg, statuType = "success", isFromApp = false) {
    Indicator.close();
    store.dispatch('SET_ACTION_STATU', {
        'type': statuType,
        'message': msg,
        'isFromApp': isFromApp
    })
}

// api 处理数据请求
import api from '@/services/api'
Vue.prototype.$_api = api

// cookie操作
import cookie from '@/services/cookie'
Vue.prototype.$_cookie = cookie

// 社交平台操作
import social from '@/services/social'
Vue.prototype.$_social = social

// 全局配置信息
const ua = window.navigator.userAgent.toLowerCase()
var isWechat = false
var isApp = false
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    isWechat = true
    store.dispatch('SET_IS_WECHAT', true)
    social.init()
}
if (ua.match(/SMI/i) == 'smi') {
    isApp = true
    store.dispatch('SET_IS_APP', true)
}
Vue.prototype.$_config = {
    'isWechat': isWechat,
    'isApp': isApp
}
