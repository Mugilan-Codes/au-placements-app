import {Themes} from '../../../config';

export const initialState = {
  dark: false,
  theme: Themes.LIGHT,
  toggle: () => {},
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'THEME_LOADED':
      return {...state, ...payload};
    default:
      return state;
  }
};

export default reducer;
