import axios from 'axios';
import { message } from 'antd';

const xhr = () => {
  // const baseURL = process.env.NEXT_PUBLIC_APP_ENV === 'develop'
  // 	? process.env.NEXT_PUBLIC_API_URL_DEVELOP
  // 	: process.env.NEXT_PUBLIC_API_URL_PRODUCTION

  const axiosinstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_PRODUCTION,
    timeout: 500000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('uToken'),
    },
  });

  axiosinstance.interceptors.response.use(
    function(response) {
      return response;
    },
    error => {
      // console.log('Error::::::::', JSON.stringify(error, false, 2))
      if (error.response && error.response.status === 401) {
        message.error('La sesión ha expirado');
        localStorage.removeItem('uToken');
        localStorage.removeItem('uScopes');
        localStorage.removeItem('uUser');
        localStorage.removeItem('career');
        localStorage.removeItem('academic_level');
        localStorage.removeItem('Jobs');

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return axiosinstance;
};

export default xhr;
