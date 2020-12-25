import {USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR} from './types';

export const initialState = {
  loading: true,
  user: null,
  isAuthenticated: false,
  accessToken: null,
  restoreToken: null, //todo: Implement this is Backend API
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        accessToken: null,
        restoreToken: null,
      };
    default:
      return state;
  }
};

export default reducer;
