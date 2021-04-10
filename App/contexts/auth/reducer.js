import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESTORE_TOKEN,
  LOGOUT,
  RESTORE_TOKEN_FAIL,
} from './types';
import {setAuthToken, storage} from '../../utils';

export const initialState = {
  isLoading: true,
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        user: payload,
        isAuthenticated: true,
      };
    case RESTORE_TOKEN:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      setAuthToken(payload.accessToken);
      storage.accessToken.set(payload.accessToken);
      storage.refreshToken.set(payload.refreshToken);
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case RESTORE_TOKEN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      setAuthToken();
      storage.accessToken.remove();
      storage.refreshToken.remove();
      return {
        ...state,
        isLoading: false,
        user: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export default reducer;
