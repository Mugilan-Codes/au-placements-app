import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Student} from '../../api';
import {logout} from './authSlice';

export const load = createAsyncThunk('user/load', async (_, thunkAPI) => {
  try {
    const res = await Student.get();

    if (res.status === 200) {
      return res.data;
    } else {
      // return thunkAPI.rejectWithValue(res.data);
      console.log('load error', res.data);
      // return thunkAPI.dispatch(logout());
      throw new Error(res.data);
    }
  } catch (error) {
    console.log('user/load error');
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log({message});
    thunkAPI.dispatch(clearState());
    return thunkAPI.dispatch(logout());
  }
});

// TODO: work on this
export const updateMarks = createAsyncThunk(
  'user/updateMarks',
  async (marks, thunkAPI) => {
    try {
      const res = await Student.mark(marks);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data);
      }
    } catch (error) {
      console.log('user/updateMarks error');
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log({message});
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// TODO: updateMarks(), updateEducation()
// TODO: mark state, education state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(load.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(load.rejected, (state, action) => {
      console.log('load', action.payload);
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const {clearState} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
