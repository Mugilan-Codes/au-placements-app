import {Student} from '../../../api';
import {LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR} from './types';

export const useAuthActions = (authState, dispatch) => {
  const loadStudent = async () => {
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
      const {data} = await Student.login(email, password);
      dispatch({type: LOGIN_SUCCESS, payload: data});
    } catch (err) {
      console.log(`loginStudent Action = ${err}`);
      dispatch({type: LOGIN_FAIL});
    }
  };

  return {
    loadStudent,
    loginStudent,
  };
};
