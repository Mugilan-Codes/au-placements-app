import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
import {Auth} from './constants';

export const Student = {
  login: async (email, password) => {
    const config = {headers: {'Content-Type': 'application/json'}};

    const body = JSON.stringify({email, password});

    // return await axios.post('/student/login', body, config);
    return await axios.post(Auth.LOGIN, body, config);
  },
};
