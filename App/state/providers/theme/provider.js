import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import {CombinedDarkTheme, CombinedDefaultTheme} from '../../../styles';

const ThemeContext = createContext();

// TODO: Add Theme using react native paper and react navigation combined
// ? https://blog.logrocket.com/designing-a-ui-with-custom-theming-using-react-native-paper/
// ? https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
// ? https://callstack.github.io/react-native-paper/theming.html
const ThemeProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [isThemeDark, setIsThemeDark] = useState(colorScheme === 'dark');

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  // TODO: Change Theme in sync with System Theme

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      theme,
    }),
    [toggleTheme, isThemeDark, theme],
  );

  return (
    <ThemeContext.Provider value={preferences}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => useContext(ThemeContext);
export default ThemeProvider;
