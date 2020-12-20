import React, {createContext, useContext, useMemo, useState} from 'react';

const StudentContext = createContext();

const StudentProvider = ({children}) => {
  const [state] = useState('');

  const login = () => {
    console.log('testing');
  };

  const value = useMemo(() => {
    return {state, login};
  }, [state]);

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);

export default StudentProvider;
