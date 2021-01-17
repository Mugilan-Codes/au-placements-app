import {Student} from '../../../api';
import {LISTING_LOADED, LISTING_LOAD_ERROR} from './types';

export const useListActions = (listState, dispatch) => {
  const loadAllListings = async () => {
    try {
      const {data} = await Student.getAllListings();
      dispatch({type: LISTING_LOADED, payload: data});
    } catch (err) {
      dispatch({type: LISTING_LOAD_ERROR});
    }
  };

  return {loadAllListings};
};
