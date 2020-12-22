import {LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED} from '../actions/types';

export const initialState = {
  student: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        student: payload,
      };
    case LOGIN_SUCCESS:
      return {...state, ...payload, isAuthenticated: true, loading: false};
    case LOGIN_FAIL:
      return {...state, isAuthenticated: false, loading: false, student: null};
    default:
      return state;
  }
};

export default authReducer;
