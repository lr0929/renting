// 房客(个人)
export default {
  state: {
    certname: 0,
    certcard: 0,
  },
  actions: {
    setcertname({
      commit
    }, k) {
      commit('m_certname', k);
    },
    setcertcard({
      commit
    }, k) {
      commit('m_certcard', k);
    },
  },
  mutations: {
    m_certname(state, k) {
      state.certname = k;
    },
    m_certcard(state, k) {
      state.certcard = k;
    },
  },
  getters: {
    certname: function(state) {
      return state.certname
    },
    certcard: function(state) {
      return state.certcard
    },
  }
}
