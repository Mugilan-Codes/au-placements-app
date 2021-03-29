import {CombinedDarkTheme, CombinedDefaultTheme, Themes} from '../../../styles';
import {CHANGE_THEME, THEME_LOADED} from './types';

export const initialState = {
  dark: false,
  theme: Themes.LIGHT,
  toggle: () => {},
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case THEME_LOADED:
      return {...state, ...payload};
    case CHANGE_THEME:
      return {...state, theme: payload};
    default:
      return state;
  }
};

export default reducer;
