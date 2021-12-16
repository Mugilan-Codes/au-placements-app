import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Student} from 'api';

export const fetchListings = createAsyncThunk(
  'listing/fetchListings',
  async (_, thunkAPI) => {
    try {
      const {data, status} = await Student.getAllListings();

      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.error.message);
      }
    } catch (err) {
      console.log('listing/fetchListings err');
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const fetchOneListing = createAsyncThunk(
  'listing/fetchOneListing',
  async (id, thunkAPI) => {
    try {
      const {data, status} = await Student.getOneListing(id);

      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.error.message);
      }
    } catch (err) {
      console.log('listing/fetchOneListing err');
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    listings: [],
    loading: false,
    error: null,
    listing: null,
  },
  reducers: {
    getListings: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    clearListings: (state) => {
      state.listings = [];
      state.loading = false;
      state.error = null;
    },
    clearListing: (state) => {
      state.listing = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListings.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchListings.fulfilled, (state, action) => {
      state.listings = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchListings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchOneListing.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOneListing.fulfilled, (state, action) => {
      console.log('listing/fetchOneListing.fulfilled');
      // console.log(action.payload);
      state.listing = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchOneListing.rejected, (state, action) => {
      console.log('listing/fetchOneListing.rejected');
      // console.log(action.payload);
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {getListings, clearListings, clearListing} = listingSlice.actions;

export const selectListings = (state) => state.listing.listings;
export const selectLoading = (state) => state.listing.loading;
export const selectError = (state) => state.listing.error;
export const selectListing = (state) => state.listing.listing;

export default listingSlice.reducer;
