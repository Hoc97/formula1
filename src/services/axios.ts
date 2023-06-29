import axios from 'axios';
import env from '@/configs/env';

const instance = axios.create({
  baseURL: env.baseUrl
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response?.data?.MRData ? response.data.MRData : response;
  },
  async function (error) {
    return error?.response ?? Promise.reject(error);
  }
);

export default instance;
