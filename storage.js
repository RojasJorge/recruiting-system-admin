import axios from 'axios'

const storage = () => {
	
	const axiosinstance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_APP_FILE_STORAGE,
		timeout: 500000,
		headers: {
			"Content-Type": "application/json",
			// "Authorization": localStorage.getItem('uToken')
		}
	})
	
	axiosinstance.interceptors.response.use(function (response) {
		return response;
	}, error => {
		return Promise.reject(error)
	})
	
	return axiosinstance
}

export default storage
