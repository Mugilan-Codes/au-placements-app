import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

export const CombinedDefaultTheme = merge.all([
  PaperDefaultTheme,
  NavigationDefaultTheme,
  {}, // ! Customize
]);
export const CombinedDarkTheme = merge([
  PaperDarkTheme,
  NavigationDarkTheme,
  {}, // ! Customize
]);

// todo: Design Color Pallete here
export const Themes = {
  DARK: {
    background: '#2E3440',
    border: '#575c66',
    backgroundAlt: '#575c66',
    borderAlt: '#2E3440',
    text: '#ECEFF4',
  },
  LIGHT: {
    background: '#ededed',
    border: '#bdbdbd',
    backgroundAlt: '#eaeaeb',
    borderAlt: '#bdbdbd',
    text: '#171717',
  },
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(0, 0, 0)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const customTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: '#034748',
    accent: '#11B5E4',
    background: '#F1F7ED',
    surface: '#F1F7ED',
    text: '#001021',
    error: '#B71F0E',
    disabled: '#BEC6C6',
    placeholder: '#1481BA',
    backdrop: '#001021',
  },
  fonts: {
    regular: 'Helvetica Neue',
    medium: 'Helvetica Neue Light',
  },
};
