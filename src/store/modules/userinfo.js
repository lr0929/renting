// 获取个人信息
export default {
	state: {
		userinfo: {
      root:0
    },
    //加载动画
    loading:false
	},
	actions: {
		setuserinfo({commit},k) {
			commit('m_userinfo', k);
		},
		setloading({commit},k) {
			commit('m_setloading', k);
		},
	},
	mutations: {
		m_userinfo(state, k) {
			state.userinfo = k;
		},
		m_setloading(state, k) {
			state.loading = k;
		},
	},
	getters: {
		userinfo: state =>state.userinfo,
		loading: state =>state.loading,
	}
}
