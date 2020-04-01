import Vue from 'vue'
import Vuex from 'vuex'
// 持续化插件
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
import register from "./modules/register"
import userinfo from "./modules/userinfo"
import logging from "./modules/logging"
import amend from "./modules/amend"
import authent from "./modules/authent.js"
import cert from "./modules/cert.js"
import hotel from "./modules/hotel.js"
import forget from "./modules/forget.js"
const store = new Vuex.Store({
  modules: {
    register,
    logging,
    userinfo,
    amend,
    authent,
    cert,
    hotel,
    forget,
  },
  // 使用持续化插件
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
export default store
