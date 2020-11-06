import axios from 'axios'
import {message} from 'antd'
import store from "./store"

const xhr = () => {
	const auth = store.getState().auth
	
	const axiosinstance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL_PRODUCTION,
		timeout: 500000,
		headers: {
			'Content-Type': 'application/json',
			Authorization: auth.token,
		}
	})
	
	axiosinstance.interceptors.response.use(
		function (response) {
			return response;
		},
		error => {
			if (error.response && error.response.status === 401) {
				store.persist.clear().then(() => {
					message.error('La sesión ha expirado')
					location.href = '/'
				})
			}
			
			return Promise.reject(error);
		}
	)
	
	return axiosinstance
}

export default xhr
