import config from "./config.js"

export default {
  //获取用户信息
  getuserinfo(data) {
    return config.post('api/getuserinfo', data)
  },
  getcity(data) {
    return config.get('api/getcity', data)
  }
}
