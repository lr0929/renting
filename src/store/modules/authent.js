// 房东
export default {
  state: {
    authentname: 0,
    authentcard: 0,
  },
  actions: {
    setauthentname({
      commit
    }, k) {
      commit('m_authentname', k);
    },
    setauthentcard({
      commit
    }, k) {
      commit('m_authentcard', k);
    },
  },
  mutations: {
    m_authentname(state, k) {
      state.authentname = k;
    },
    m_authentcard(state, k) {
      state.authentcard = k;
    },
  },
  getters: {
    authentname: function(state) {
      return state.authentname
    },
    authentcard: function(state) {
      return state.authentcard
    },
  }
}
