import {useColorScheme} from 'react-native';

import {CombinedDarkTheme, CombinedDefaultTheme} from '../styles';

// ? https://reactjs.org/docs/hooks-custom.html
const useCustomTheme = () => {
  const colorScheme = useColorScheme();

  console.log('useCustomTheme.js colorScheme =', colorScheme);

  return colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
};

export default useCustomTheme;
