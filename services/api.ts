import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const publicApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default publicApi;
