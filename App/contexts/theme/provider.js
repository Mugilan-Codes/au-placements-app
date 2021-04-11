import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider as StyleProvider} from 'styled-components/native';
import {Appearance} from 'react-native';

import {DarkTheme, LightTheme} from '../../styles';

const systemColorScheme = Appearance.getColorScheme() || 'light';
console.log('theme provider.js systemColorScheme =', systemColorScheme);

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const isSystemColorSchemeDark = systemColorScheme === 'dark';
  const [isDark, setIsDark] = useState(isSystemColorSchemeDark);

  let theme = isDark ? DarkTheme : LightTheme;

  console.log(`ThemeProvider isDark = ${isDark}`);

  const onThemeChange = ({colorScheme}) => {
    console.log('ThemeProvider OnThemeChange colorScheme =', colorScheme);
    setIsDark(colorScheme === 'dark');
  };

  useEffect(() => {
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  // TODO: Store the user preference when toggled and maintain that
  const toggleTheme = useCallback(() => {
    return setIsDark(!isDark);
  }, [isDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isDark,
      theme,
    }),
    [toggleTheme, isDark, theme],
  );

  return (
    <ThemeContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <StyleProvider theme={theme}>{children}</StyleProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
