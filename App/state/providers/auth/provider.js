import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import reducer, {initialState} from './reducer';
import {useAuthActions} from './action';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState || {});

  const {loginStudent, loadStudent, logoutStudent} = useAuthActions(
    state,
    dispatch,
  );

  const login = useCallback(loginStudent, []);

  const loadUser = useCallback(loadStudent, []);

  const logout = useCallback(logoutStudent, []);

  const value = useMemo(() => {
    return {state, login, loadUser, logout};
  }, [state, login, loadUser, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
