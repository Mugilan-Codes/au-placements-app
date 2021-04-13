import axios from 'axios';

const BASE_URL = 'http://192.168.0.104:5000/api';

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

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common[TOKEN_KEY] = token;
    console.log('AuthToken is set');
  } else {
    delete instance.defaults.headers.common[TOKEN_KEY];
    console.log('AuthToken is removed');
  }
};

instance.interceptors.request.use(
  (config) => {
    console.log('axios instance interceptors request config =', config);
    return config;
  },
  (error) => {
    console.log('axios instance interceptors request error =', error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    console.log('axios instance interceptors response =', response);
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log('axios instance interceptors response error =', error);
    return Promise.reject(error);
  },
);

// Global Axios Config
axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err),
);
axios.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject(err),
);
