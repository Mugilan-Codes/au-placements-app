import React, {createContext, useContext, useReducer} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import reducer, {initialState} from './reducer';
import {useThemeActions} from './action';

const ThemeContext = createContext();

// TODO: Add Theme using react native paper and react navigation combined
// ? https://blog.logrocket.com/designing-a-ui-with-custom-theming-using-react-native-paper/
// ? https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
// ? https://callstack.github.io/react-native-paper/theming.html
const ThemeProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState || {});

  const themeActions = useThemeActions(state, dispatch);

  return (
    <ThemeContext.Provider value={{themeState: state, themeActions}}>
      <PaperProvider theme={state.theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
