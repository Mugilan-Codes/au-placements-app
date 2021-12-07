import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Student} from '../../api';

export const fetchListings = createAsyncThunk(
  'listing/fetchListings',
  async (_, thunkAPI) => {
    const {data} = await Student.getAllListings();

    if (data.msg) {
      console.log('listing/fetchListings data.msg');
      console.log(data.msg);
      return thunkAPI.rejectWithValue(data.msg);
    }
    return data;
  },
);

const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    listings: [],
    loading: false,
    error: null,
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
  },
});

export const {getListings, clearListings} = listingSlice.actions;

export const selectListings = (state) => state.listing.listings;
export const selectLoading = (state) => state.listing.loading;
export const selectError = (state) => state.listing.error;

export default listingSlice.reducer;
