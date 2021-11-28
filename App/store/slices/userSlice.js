import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Student} from '../../api';
import {logout} from './authSlice';

export const load = createAsyncThunk('user/load', async (_, thunkAPI) => {
  try {
    const res = await Student.get();

    if (res.status === 200) {
      return res.data;
    } else {
      return thunkAPI.rejectWithValue(res.data);
      // return thunkAPI.dispatch(logout());
    }
  } catch (error) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log({message});
    return thunkAPI.dispatch(logout());
  }
});

// TODO: updateMarks(), updateEducation()
// TODO: mark state, education state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(load.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(load.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const {} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
