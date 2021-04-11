//! Test URL .. Change after Deploying
const BASE_URL = 'http://192.168.0.104:5000';
const API_URL = `${BASE_URL}/api/student`;

export const Auth = {
  REGISTER: `${API_URL}/register`,
  LOGIN: `${API_URL}/login`,
  GET: `${API_URL}`,
  UPDATE: `${API_URL}`,
  COURSES: `${API_URL}/courses`,
  MARKS: `${API_URL}/marks`,
  EDUCATION: `${API_URL}/education`,
};

export const Listing = {
  GET_ALL: `${API_URL}/listing`,
  GET: (list_id) => `${API_URL}/listing/${list_id}`,
};
