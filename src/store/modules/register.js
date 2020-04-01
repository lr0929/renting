// 注册
export default {
  state: {
    username: 0,
    password: 0,
    code: 0
  },
  actions: {
    setkey({
      commit
    }, k) {
      commit('m_username', k);
    },
    setpass({
      commit
    }, k) {
      commit('m_password', k);
    },
    setcode({
      commit
    }, k) {
      commit('m_code', k);
    },
  },
  mutations: {
    m_username(state, k) {
      state.username = k;
    },
    m_password(state, k) {
      state.password = k;
    },
    m_code(state, k) {
      state.code = k;
    },
  },
  getters: {
    username: function(state) {
      return state.username
    },
    password: function(state) {
      return state.password
    },
    code: function(state) {
      return state.code
    },
  }
}
