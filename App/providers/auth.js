import React, {createContext, useContext} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
