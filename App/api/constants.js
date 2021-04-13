const STUDENT = '/student';

export const Auth = {
  REGISTER: `${STUDENT}/register`,
  LOGIN: `${STUDENT}/login`,
  GET: `${STUDENT}`,
  UPDATE: `${STUDENT}`,
  COURSES: `${STUDENT}/courses`,
  MARKS: `${STUDENT}/marks`,
  EDUCATION: `${STUDENT}/education`,
};

export const Listing = {
  GET_ALL: `${STUDENT}/listing`,
  GET: (list_id) => `${STUDENT}/listing/${list_id}`,
};
