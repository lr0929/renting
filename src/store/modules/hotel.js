// 公寓入住
export default {
  state: {
    hotelname: 0,
    hotelnum: 0,
    hotelcity: 0,
    hotelman: 0,
    hotelphone: 0,
  },
  actions: {
    sethotelname({
      commit
    }, k) {
      commit('m_hotelname', k);
    },
    sethotelnum({
      commit
    }, k) {
      commit('m_hotelnum', k);
    },
    sethotelcity({
      commit
    }, k) {
      commit('m_hotelcity', k);
    },
    sethotelman({
      commit
    }, k) {
      commit('m_hotelman', k);
    },
    sethotelphone({
      commit
    }, k) {
      commit('m_hotelphone', k);
    },
  },
  mutations: {
    m_hotelname(state, k) {
      state.hotelname = k;
    },
    m_hotelnum(state, k) {
      state.hotelnum = k;
    },
    m_hotelcity(state, k) {
      state.hotelcity = k;
    },
    m_hotelman(state, k) {
      state.hotelman = k;
    },

    m_hotelphone(state, k) {
      state.hotelphone = k;
    },
  },
  getters: {
    hotelname: function(state) {
      return state.hotelname
    },
    hotelnum: function(state) {
      return state.hotelnum
    },
    hotelcity: function(state) {
      return state.hotelcity
    },
    hotelman: function(state) {
      return state.hotelman
    },
    hotelphone: function(state) {
      return state.hotelphone
    },
  }
}
