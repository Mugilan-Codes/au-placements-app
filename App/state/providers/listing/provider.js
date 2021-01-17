import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import reducer, {initialState} from './reducer';
import {useListActions} from './action';

const ListContext = createContext();

const ListProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState || {});

  const {loadAllListings} = useListActions(state, dispatch);

  const loadListings = useCallback(loadAllListings, []);

  const value = useMemo(() => {
    return {state, loadListings};
  }, [state, loadListings]);

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useList = () => useContext(ListContext);
export default ListProvider;
