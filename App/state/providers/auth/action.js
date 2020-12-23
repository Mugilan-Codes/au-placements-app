import {Student} from '../../../api';
import {LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED} from './types';

export const useAuthActions = (authState, dispatch) => {
  return {
    loadUser: (user) => dispatch({type: USER_LOADED, payload: user}),
    loginStudent: async (email, password) => {
      try {
        const res = await Student.login(email, password);
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
      } catch (err) {
        dispatch({type: LOGIN_FAIL});
      }
    },
  };
};
