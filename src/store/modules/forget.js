// 忘记密码
export default {
  state: {
    usersname: 0,
    codevs: 0,
    newpass: 0,
  },
  actions: {
    setusersname({
      commit
    }, k) {
      commit('m_usersname', k);
    },
    setcodevs({
      commit
    }, k) {
      commit('m_codevs', k);
    },
    setnewpass({
      commit
    }, k) {
      commit('m_newpass', k);
    },
  },
  mutations: {
    m_usersname(state, k) {
      state.usersname = k;
    },
    m_codevs(state, k) {
      state.codevs = k;
    },
    m_newpass(state, k) {
      state.newpass = k;
    },
  },
  getters: {
    usersname: function(state) {
      return state.usersname
    },
    codevs: function(state) {
      return state.codevs
    },
    newpass: function(state) {
      return state.newpass
    },
  }
}
