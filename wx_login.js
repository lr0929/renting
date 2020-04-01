//开始登录：获取到code
function login(phone,callback) {
  wx.showLoading()
  wx.login({
    success: function(res) {
      if (res.code) {
        getuserinfo(phone,res.code, callback)
      } 
    }, 
    fail: function(err) {
      showToast('code获取失败')
    }
  }) 
}
//获取用户信息
function getuserinfo(phone,code, callback) {
  // 调用wx.getUserInfo获取用户的信息
  wx.getUserInfo({
    // 获取成功
    success: function(res) {
      // 把用户的信息存到storage
      wx.setStorageSync("userInfo", res.userInfo)
      // 调用开发者后台提供的登录接口
      postlogin(phone, code, res.userInfo.nickName, callback)
    },
    fail: function () {
      wx.hideLoading()
      // 获取用户信息失败，清楚全局存储的登录状态，弹窗提示一键登录
      // 使用token管理登录态的，清楚存储全局的token
      // 使用cookie管理登录态的，可以清楚全局登录状态管理的变量
      wx.setStorageSync('storeUpdateToken', '')
      //获取不到用户信息，说明用户没有授权或者取消授权。弹窗提示一键登录
      showLoginModal() 
      // showToast('获取用户信息失败')
    }
  })
}
//调用开发者后台接口获取token
function postlogin(phone, code, nickName, callback) {
  wx.request({
    url: 'http://49.235.188.239:3001/api/wx_login',
    data: {
      code: code,
      phone: phone,
      nickName: nickName
    },
    method:"post",
    success:function(res){
      if(res.data.stu===200){
        wx.hideLoading()
        // 使用token管理登录状态，存储全局token，用于当做登录态判断，
        // 把后台返回的token保存到Storage里面
        wx.setStorageSync("token", res.data.token)
        callback()
      }else{
        showToast()
      }
    }
  })
}
// 提示框
function showToast(content){
  wx.showToast({
    title: content,
    icon:"none"
  })
}

// 一键登录弹框
function showLoginModal() {
  wx.showModal({
    title: '提示',
    content: '你还未登录，登录后可获得完整体验 ',
    confirmText: '一键登录',
    success(res) {
      // 点击一键登录，去授权页面
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }
  })
}

// 判断是否登录
function isLogin(callback) {
  // 获取storage里面的token，用来判断用户是否登录
  let token = wx.getStorageSync("token")
  if (token) {
    // 如果有全局存储的登录态，暂时认为他是登录状态
    callback && callback()
  } else {
    // 如果没有登录态，弹窗提示一键登录
    showLoginModal()
  }
}

module.exports = {
  login,
  getuserinfo,
  postlogin,
  showToast,
  showLoginModal,
  isLogin,
}