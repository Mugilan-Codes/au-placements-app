import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
// TODO: remove react-native-appearance package
import {AppearanceProvider, Appearance} from 'react-native-appearance';

import {DarkTheme, LightTheme} from '../../../styles';

const ThemeContext = createContext();

const defaultColorScheme = Appearance.getColorScheme() || 'light';

// TODO: Add Theme using react native paper and react navigation combined
// ? https://blog.logrocket.com/designing-a-ui-with-custom-theming-using-react-native-paper/
// ? https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
// ? https://callstack.github.io/react-native-paper/theming.html
const ThemeProvider = ({children}) => {
  const defaultIsDark = defaultColorScheme === 'dark';
  const [isThemeDark, setIsThemeDark] = useState(defaultIsDark);

  let theme = isThemeDark ? DarkTheme : LightTheme;

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsThemeDark(colorScheme === 'dark');
    });
    return () => subscription.remove();
  }, []);

  // TODO: Store the user preference when toggled and maintain that
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
      <AppearanceProvider>
        <PaperProvider theme={theme}>{children}</PaperProvider>
      </AppearanceProvider>
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => useContext(ThemeContext);
export default ThemeProvider;
