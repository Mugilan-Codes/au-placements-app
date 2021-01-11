import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
import {Auth} from './constants';

const config = {headers: {'Content-Type': 'application/json'}};

export const Student = {
  // todo: login with register_no
  login: async (email, password) => {
    const body = JSON.stringify({email, password});

    return await axios.post(Auth.LOGIN, body, config);
  },
  // todo: Add course_id
  register: async ({register_no, name, email, password, confirm_password}) => {
    const body = JSON.stringify({
      register_no,
      name,
      email,
      password,
      confirm_password,
    });

    return await axios.post(Auth.REGISTER, body, config);
  },
  get: async () => {
    return await axios.get(Auth.GET);
  },
  getCourses: async () => {
    return await axios.get(Auth.COURSES);
  },
};
