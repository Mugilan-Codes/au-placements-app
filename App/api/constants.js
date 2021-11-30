const STUDENT = '/student';

export const Auth = {
  REGISTER: `${STUDENT}/register`,
  LOGIN: `${STUDENT}/login`,
  GET: `${STUDENT}`,
  UPDATE: `${STUDENT}`,
  MARKS: `${STUDENT}/marks`,
  EDUCATION: `${STUDENT}/education`,
};

export const Course = {
  GET: `${STUDENT}/courses`,
};

export const Listing = {
  GET_ALL: `${STUDENT}/listing`,
  GET: (list_id) => `${STUDENT}/listing/${list_id}`,
};

export const Other = {
  MARK: `${STUDENT}/marks`,
  EDUCATION: `${STUDENT}/education`,
};
