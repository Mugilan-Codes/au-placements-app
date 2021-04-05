import {Student} from '../../../api';
import {storage} from '../../../utils';
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
    console.log('loadStudent Action');
    try {
      // todo: Check if the token exists and is that token a valid one
      const {data} = await Student.get();
      dispatch({type: USER_LOADED, payload: data});
    } catch (err) {
      console.log(`loadStudent Action = ${err}`);
      console.log('loadStudent Action err.response.data =', err.response.data);
      dispatch({type: AUTH_ERROR});
    }
  };

  const loginStudent = async ({email, password}) => {
    console.log('loginStudent Action');
    try {
      const {data} = await Student.login(email, password);
      dispatch({type: LOGIN_SUCCESS, payload: data});
      dispatch(loadStudent());
    } catch (err) {
      console.log(`loginStudent Action = ${err}`);
      const errors = err.response.data;
      console.log('loginStudent Action err.response.data =', errors);
      console.log('loginStudent Action err.response.data =', errors.email);
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
    console.log('registerStudent Action');
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
      dispatch({type: REGISTER_FAIL});
    }
  };

  const logoutStudent = async () => {
    console.log('logoutStudent Action');
    dispatch({type: LOGOUT});
  };

  // TODO: Make this so, that refreshToken is used when accessToken is expired
  const restoreTokenFromStorage = async () => {
    console.log('restoreTokenFromStorage Action');
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
