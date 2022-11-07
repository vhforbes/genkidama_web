import axios from 'axios';

// interface RequestOptions {
//   token?: string;
// }

// const axiosApiInstance = axios.create();

// const api = (options: RequestOptions = {}) => {
//   return axios.create({
//     baseURL: 'http://localhost:3333',
//     headers: { Authorization: `Bearer ${options.token}` },
//   });
// };

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
