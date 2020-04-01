// 登录
export default {
  state: {
    loginuser: 0,
    loginpass: 0,
    token: "",
  },
  actions: {
    setuser({
      commit
    }, k) {
      commit('m_loginuser', k);
    },
    setpassw({
      commit
    }, k) {
      commit('m_loginpass', k);
    },

    settoken({
      commit
    }, k) {
      commit('m_token', k);
    },

  },
  mutations: {
    m_loginuser(state, k) {
      state.loginuser = k;
    },
    m_loginpass(state, k) {
      state.loginpass = k;
    },
    m_token(state, k) {
      state.token = k;
    },
  },
  getters: {
    loginuser: function(state) {
      return state.loginuser
    },
    loginpass: function(state) {
      return state.loginpass
    },
    token: function(state) {
      return state.token
    },

  }

}
