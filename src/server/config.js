import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://49.235.188.239:3002/';
export default {
	get(url, params) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
				params: params
			}).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},
	post(url, data) {
		return new Promise((resolve, reject) => {
			axios.post(url, qs.stringify(data), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	}
}