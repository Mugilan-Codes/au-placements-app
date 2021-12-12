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
  update: async ({name, email, course_id}) => {
    return await Api.put(Auth.UPDATE, {name, email, course_id});
  },
  mark: async ({cgpa, active_backlog, backlog_history}) => {
    return await Api.post(Other.MARK, {cgpa, active_backlog, backlog_history});
  },
  education: async ({
    tenth_board,
    tenth_percentage,
    twelfth_board,
    twelfth_percentage,
    grad_course,
    grad_percentage,
  }) => {
    return await Api.post(Other.EDUCATION, {
      tenth_board,
      tenth_percentage,
      twelfth_board,
      twelfth_percentage,
      grad_course,
      grad_percentage,
    });
  },
};
