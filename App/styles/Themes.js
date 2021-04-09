import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

// ? https://callstack.github.io/react-native-paper/theming.html
// ? https://reactnavigation.org/docs/themes/
// const sampleTheme = {
//   dark: true,
//   mode: 'adaptive',
//   roundness: 2,
//   colors: {
//     primary: '',
//     accent: '',
//     background: '',
//     surface: '',
//     card: '',
//     text: '',
//     disabled: '',
//     placeholder: '',
//     backdrop: '',
//     onSurface: '',
//     border: '',
//     notification: '',
//   },
//   fonts: {
//     regular: '',
//     medium: '',
//     light: '',
//     thin: '',
//   },
//   animation: {
//     scale: 1,
//   },
// };

const customCommonTheme = {};

const customLightTheme = {
  colors: {
    background: '#ededed',
    border: '#bdbdbd',
    backgroundAlt: '#eaeaeb',
    borderAlt: '#bdbdbd',
    text: '#171717',
  },
};
const customDarkTheme = {
  colors: {
    background: '#2E3440',
    border: '#575c66',
    backgroundAlt: '#575c66',
    borderAlt: '#2E3440',
    text: '#ECEFF4',
  },
};

const CombinedDefaultTheme = merge.all([
  PaperDefaultTheme,
  NavigationDefaultTheme,
  customCommonTheme,
  customLightTheme,
]);
const CombinedDarkTheme = merge.all([
  PaperDarkTheme,
  NavigationDarkTheme,
  customCommonTheme,
  customDarkTheme,
]);

export {CombinedDefaultTheme as LightTheme, CombinedDarkTheme as DarkTheme};
