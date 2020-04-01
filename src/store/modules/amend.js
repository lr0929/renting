// 修改密码
export default {
  state: {
    usernames: 0,
    codes: 0,
    oldpsd: 0,
    newpsd: 0,
  },
  actions: {
    setkey({
      commit
    }, k) {
      commit('m_usernames', k);
    },
    setcode({
      commit
    }, k) {
      commit('m_codes', k);
    },
    setoldpsd({
      commit
    }, k) {
      commit('m_oldpsd', k);
    },
    setnewpsd({
      commit
    }, k) {
      commit('m_newpsd', k);
    },
  },
  mutations: {
    m_usernames(state, k) {
      state.usernames = k;
    },
    m_codes(state, k) {
      state.codes = k;
    },
    m_oldpsd(state, k) {
      state.oldpsd = k;
    },
    m_newpsd(state, k) {
      state.newpsd = k;
    },
  },
  getters: {
    usernames: function(state) {
      return state.usernames
    },
    codes: function(state) {
      return state.codes
    },
    oldpsd: function(state) {
      return state.oldpsd
    },
    newpsd: function(state) {
      return state.newpsd
    },
  }
}
