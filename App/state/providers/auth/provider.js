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

  const {
    loginStudent,
    loadStudent,
    registerStudent,
    logoutStudent,
    restoreTokenFromStorage,
  } = useAuthActions(state, dispatch);

  const login = loginStudent;

  const loadUser = useCallback(() => loadStudent, [loadStudent]);

  const register = registerStudent;

  const logout = logoutStudent;

  const restoreToken = useCallback(() => restoreTokenFromStorage, [
    restoreTokenFromStorage,
  ]);

  const value = useMemo(() => {
    return {state, login, loadUser, register, logout, restoreToken};
  }, [state, login, loadUser, register, logout, restoreToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
