//! Test URL .. Change after Deploying
const API_URL = 'http://192.168.0.102:5000/api';

export const Auth = {
  REGISTER: `${API_URL}/student/register`,
  LOGIN: `${API_URL}/student/login`,
  GET: `${API_URL}/student`,
  UPDATE: `${API_URL}/student`,
  COURSES: `${API_URL}/student/courses`,
  MARKS: `${API_URL}/student/marks`,
  EDUCATION: `${API_URL}/student/education`,
  LISTINGS: `${API_URL}/student/listing`,
  LISTING: (list_id) => `${API_URL}/student/listing/${list_id}`,
};
