import {Student} from '../../../api';
import {LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR} from './types';

export const useAuthActions = (authState, dispatch) => {
  const loadUser = async () => {
    try {
      // check and store token in AsyncStorage
      const res = await Student.get();
      dispatch({type: USER_LOADED, payload: res.data});
    } catch (err) {
      console.log(err);
      dispatch({type: AUTH_ERROR});
    }
  };

  const loginStudent = async ({email, password}) => {
    try {
      const res = await Student.login(email, password);
      console.log(res);
      dispatch({type: LOGIN_SUCCESS, payload: res.data});
      dispatch(loadUser());
    } catch (err) {
      console.log(`loginStudent Action = ${err}`);
      dispatch({type: LOGIN_FAIL});
    }
  };

  return {
    loadUser,
    loginStudent,
  };
};
