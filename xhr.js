import axios from 'axios';
import {
  message
} from "antd";

export default () => {

  const axiosinstance = axios.create({
    baseURL: process.env.APP_ENV === "production" ? "https://staging.umana.co:3026/api/v1" : 'http://localhost:3026/api/v1',
    timeout: 500000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('uToken')
    }
  });

  axiosinstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error && error.response && error.response.status === 401) {
      message.error("La sesión ha expirado");
      localStorage.removeItem("eToken");
      localStorage.removeItem("eUser");

      setTimeout(() => {
        // window.location.reload();
      }, 1000);
    }
    // Do something with response error
    return Promise.reject(error);
  });

  return axiosinstance;
};
