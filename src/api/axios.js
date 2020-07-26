import axios from 'axios';
import {getData} from '../utils/persitUtil';

axios.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const token = await getData('access_token');
    // if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default axios;
