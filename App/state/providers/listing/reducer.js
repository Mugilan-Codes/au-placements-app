import {LISTING_LOADED, LISTING_LOAD_ERROR} from './types';

export const initialState = {
  // isLoading: true,
  listings: null,
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case LISTING_LOADED:
      return {
        ...state,
        listings: payload,
        // isLoading: false,
      };
    case LISTING_LOAD_ERROR:
      return {
        ...state,
        listings: null,
        // isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
