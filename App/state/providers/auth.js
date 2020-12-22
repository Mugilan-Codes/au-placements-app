import React, {createContext, useContext, useMemo, useReducer} from 'react';

import {authReducer, initialState} from '../reducers';
import {useAuthActions} from '../actions';

const StudentContext = createContext();

const StudentProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState || {});

  const authActions = useAuthActions(state, dispatch);

  const value = useMemo(() => {
    return {state, authActions};
  }, [state, authActions]);

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);

export default StudentProvider;
