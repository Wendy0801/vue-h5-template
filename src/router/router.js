import Vue from 'vue'
import Router from 'vue-router'
import config from './config'

Vue.use(Router)
export default new Router({
  // mode: 'history', // 去掉#号的路由形式,不方便刷新操作
  history: true,
  base: __dirname,
  routes: config
})
