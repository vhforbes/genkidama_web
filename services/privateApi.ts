import axios from 'axios';
import memoizedRefreshToken from './refreshToken';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('@Genkidama:token') as string;

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const token = await memoizedRefreshToken();

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  },
);

const privateApi = axios;

export default privateApi;
