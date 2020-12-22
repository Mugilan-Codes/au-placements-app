import {USER_LOADED} from './types';

export const useAuthActions = (authState, dispatch) => {
  return {
    loadUser: (user) => dispatch({type: USER_LOADED, payload: user}),
  };
};
