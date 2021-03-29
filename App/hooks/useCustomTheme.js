import {useColorScheme} from 'react-native';

import {CombinedDarkTheme, CombinedDefaultTheme} from '../styles';

// ? https://reactjs.org/docs/hooks-custom.html
const useCustomTheme = () => {
  const colorScheme = useColorScheme();

  console.log('useCustomTheme.js colorScheme =', colorScheme);

  return colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
};

export default useCustomTheme;

// import {useEffect, useState} from 'react';
// import {useColorScheme, Appearance} from 'react-native';

// import {CombinedDarkTheme, CombinedDefaultTheme} from '../styles';

// // ? https://reactjs.org/docs/hooks-custom.html
// const useCustomTheme = () => {
//   const defaultScheme = useColorScheme();
//   const [themeState, setThemeState] = useState(defaultScheme);

//   useEffect(() => {
//     const subcription = Appearance.addChangeListener(({colorScheme}) => {
//       setThemeState(colorScheme);
//     });

//     return () => subcription.remove();
//   }, []);

//   return themeState === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
// };

// export default useCustomTheme;
