// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jquery from 'jquery'
import rem from "./assets/js/rem.js"
import public_css from "./assets/css/public.css"
import VueAMap from 'vue-amap';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
  CitySelect
} from 'vue-ydui/dist/lib.rem/cityselect'; // 按需引入vue-ydui  rem版
import axios from 'axios'
import store from './store/index'
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAMap);
Vue.component(CitySelect.name, CitySelect) // 引入vue-ydui组件
//定义一个响应拦截器
axios.interceptors.request.use(function(config) {
  store.state.userinfo.loading = true; //在请求发出之前进行一些操作
  return config
})
axios.interceptors.response.use(function(config) {
  store.state.userinfo.loading = false; //在这里对返回的数据进行处理
  return config
})
//地图
VueAMap.initAMapApiLoader({
  key: 'd5efb33db485c34d96b33871dce5392c', //自己申请的key
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.Geocoder', 'AMap.Geolocation'],
  v: '1.4.4'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  rem,
  jquery,
  public_css,
  components: {
    App
  },
  template: '<App/>'
})
