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
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

export const useAuthActions = (authState, dispatch) => {
  const loadStudent = async () => {
    try {
      // todo: Check if the token exists and is that token a valid one
      const {data} = await Student.get();
      dispatch({type: USER_LOADED, payload: data});
    } catch (err) {
      console.log(`loadStudent Action = ${err}`);
      dispatch({type: AUTH_ERROR});
    }
  };

  const loginStudent = async ({email, password}) => {
    try {
      const {data} = await Student.login(email, password);
      dispatch({type: LOGIN_SUCCESS, payload: data});
      dispatch(loadStudent());
    } catch (err) {
      console.log(`loginStudent Action = ${err}`);
      dispatch({type: LOGIN_FAIL});
    }
  };

  const registerStudent = async ({
    register_no,
    name,
    email,
    password,
    confirm_password,
  }) => {
    try {
      const {data} = await Student.register({
        register_no,
        name,
        email,
        password,
        confirm_password,
      });
      dispatch({type: REGISTER_SUCCESS, payload: data});
      dispatch(loadStudent());
    } catch (err) {
      console.log(`registerStudent Action = ${err}`);
      console.log(err);
      dispatch({type: REGISTER_FAIL});
    }
  };

  const logoutStudent = async () => {
    dispatch({type: LOGOUT});
  };

  // TODO: Modify this so that it does not throw any errors
  const restoreTokenFromStorage = async () => {
    try {
      const accessToken = await storage.accessToken.get();
      const refreshToken = await storage.refreshToken.get();
      if (!accessToken && !refreshToken) {
        throw new Error('No Tokens in Storage');
      }
      const data = {accessToken, refreshToken};
      dispatch({type: RESTORE_TOKEN, payload: data});
      dispatch(loadStudent());
    } catch (err) {
      console.log(`restoreTokenFromStorage Action = ${err}`);
      dispatch({type: RESTORE_TOKEN_FAIL});
    }
  };

  return {
    loadStudent,
    loginStudent,
    registerStudent,
    logoutStudent,
    restoreTokenFromStorage,
  };
};
