import axios from 'axios';

axios.defaults.baseURL = 'https://api-m.sandbox.paypal.com';

const paypalApi = (token: string) =>
  axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export default paypalApi;
