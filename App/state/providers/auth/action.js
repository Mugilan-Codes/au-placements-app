import {Student} from '../../../api';
import {setAuthToken, storage} from '../../../utils';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  RESTORE_TOKEN_FAIL,
  RESTORE_TOKEN,
} from './types';

export const useAuthActions = (authState, dispatch) => {
  const loadStudent = async () => {
    try {
      const {data} = await Student.get();
      console.log('loadStudent = ', data);
      dispatch({type: USER_LOADED, payload: data});
    } catch (err) {
      console.log(`loadStudent Action = ${err}`);
      dispatch({type: AUTH_ERROR});
    }
  };

  const loginStudent = async ({email, password}) => {
    try {
      const {data} = await Student.login(email, password);
      console.log('loginStudent = ', data);
      setAuthToken(data.accessToken);
      await storage.accessToken.set(data.accessToken);
      // await storage.refreshToken.set(data.refreshToken);
      dispatch({type: LOGIN_SUCCESS, payload: data});
      dispatch(loadStudent());
    } catch (err) {
      console.log(`loginStudent Action = ${err}`);
      dispatch({type: LOGIN_FAIL});
    }
  };

  const logoutStudent = async () => {
    dispatch({type: LOGOUT});
  };

  const restoreTokenFromStorage = async () => {
    try {
      dispatch({type: RESTORE_TOKEN});
    } catch (err) {
      console.log(`restoreTokenFromStorage Action = ${err}`);
      dispatch({type: RESTORE_TOKEN_FAIL});
    }
  };

  return {
    loadStudent,
    loginStudent,
    logoutStudent,
    restoreTokenFromStorage,
  };
};
