import axios from 'axios';

import {store} from '../store/store';

// const BASE_URL = 'http://192.168.0.104:5000/api';
// const BASE_URL = 'https://fathomless-earth-59931.herokuapp.com/api';
// const BASE_URL = 'http://localhost:3000/api'; // local docker to external
// const BASE_URL = 'http://192.168.0.101:3000/api'; // local docker to emulator
const BASE_URL = 'http://au-placements.me/api';

const TOKEN_KEY = 'x-auth-token';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => {
    console.log('instance validateStatus status =', status);
    return status < 500;
  },
});

export default instance;

instance.interceptors.request.use(
  async (config) => {
    console.log('axios instance interceptors request');

    const accessToken = store.getState().auth.accessToken;
    console.log(
      'axios instance interceptors request accessToken =',
      accessToken,
    );
    if (accessToken) {
      config.headers.common[TOKEN_KEY] = accessToken;
    }

    return config;
  },
  (error) => {
    console.log('axios instance interceptors request error =', error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    console.log('axios instance interceptors response');
    // Any status code that lie within the range of 2xx cause this function to trigger
    // console.log('axios instance interceptors response =', response);
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log('axios instance interceptors response error =', error);
    // TODO: Remove Token if error occurs
    return Promise.reject(error);
  },
);

// Global Axios Config
// axios.interceptors.request.use(
//   (config) => config,
//   (err) => Promise.reject(err),
// );
// axios.interceptors.response.use(
//   (response) => response,
//   (err) => Promise.reject(err),
// );
