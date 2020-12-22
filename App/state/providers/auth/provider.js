import React, {createContext, useContext, useMemo, useReducer} from 'react';

import reducer, {initialState} from './reducer';
import {useAuthActions} from './action';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState || {});

  const authActions = useAuthActions(state, dispatch);

  const value = useMemo(() => {
    return {state, authActions};
  }, [state, authActions]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
