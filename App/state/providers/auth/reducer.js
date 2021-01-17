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

const initialState = {
  isLoading: true,
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null, //todo: Implement this is Backend API
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case RESTORE_TOKEN:
      return {...state, ...payload, isLoading: false, isAuthenticated: true};
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        user: payload,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
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
