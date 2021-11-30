import {Api} from '../config';

import {Auth, Course, Listing, Other} from './constants';

export const Student = {
  // TODO: login with register_no
  login: async (email, password) => {
    const body = JSON.stringify({email, password});

    return await Api.post(Auth.LOGIN, body);
  },
  // TODO: Add course_id
  register: async ({register_no, name, email, password, confirm_password}) => {
    const body = JSON.stringify({
      register_no,
      name,
      email,
      password,
      confirm_password,
    });

    return await Api.post(Auth.REGISTER, body);
  },
  get: async () => {
    return await Api.get(Auth.GET);
  },
  getCourses: async () => {
    return await Api.get(Course.GET);
  },
  getAllListings: async () => {
    return await Api.get(Listing.GET_ALL);
  },
  getOneListing: async (list_id) => {
    return list_id && (await Api.get(Listing.GET(list_id)));
  },
  // TODO: update student, add mark & education
  update: async (data) => {
    return await Api.put(Auth.UPDATE, data);
  },
  mark: async (data) => {
    return await Api.post(Other.MARK, data);
  },
  education: async (data) => {
    return await Api.post(Other.EDUCATION, data);
  },
};
