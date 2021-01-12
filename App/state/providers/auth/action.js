import {Student} from '../../../api';
import {setAuthToken} from '../../../utils';
import {LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR} from './types';

export const useAuthActions = (authState, dispatch) => {
  const loadStudent = async () => {
    try {
      // check and store token in AsyncStorage
      const res = await Student.get();
      console.log('res = ', res.data);
      dispatch({type: USER_LOADED, payload: res.data});
    } catch (err) {
      console.log(`loadStudent Action =${err}`);
      dispatch({type: AUTH_ERROR});
    }
  };

  const loginStudent = async ({email, password}) => {
    try {
      const {data} = await Student.login(email, password);
      setAuthToken(data.token);
      dispatch({type: LOGIN_SUCCESS, payload: data});
      dispatch(loadStudent());
    } catch (err) {
      console.log(`loginStudent Action = ${err}`);
      dispatch({type: LOGIN_FAIL});
    }
  };

  //! Just testing logout feature
  const logoutStudent = async () => {
    dispatch({type: LOGIN_FAIL});
  };

  return {
    loadStudent,
    loginStudent,
    logoutStudent,
  };
};
