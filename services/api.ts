import axios from 'axios';

const api = (options: any = {}) => {
  return axios.create({
    baseURL: 'http://localhost:3333',
    headers: { Authorization: `Bearer ${options.token}` },
  });
};

export default api;
