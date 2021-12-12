import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Student} from 'api';
import {logout} from './authSlice';

// TODO: split student data into `info`, `course`, 'mark', and `education` object states
export const load = createAsyncThunk('user/load', async (_, thunkAPI) => {
  try {
    const {data, status} = await Student.get();

    if (status === 200) {
      return data;
    } else {
      console.log('load error', data);
      throw new Error(data);
    }
  } catch (error) {
    console.log('user/load error');
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.err_msg ||
      error.toString();
    console.log(message);
    thunkAPI.dispatch(clearUser());
    return thunkAPI.dispatch(logout());
  }
});

// name, email, course_id
export const update = createAsyncThunk(
  'user/update',
  async (data, thunkAPI) => {
    try {
      const res = await Student.update(data);

      if (res.status === 200) {
        return res.data;
      } else {
        console.log('update error', res.data);
        throw new Error(res.data);
      }
    } catch (error) {
      console.log('user/update error');
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateMarks = createAsyncThunk(
  'user/updateMarks',
  async (marks, thunkAPI) => {
    const {cgpa, backlog, history} = marks;
    try {
      const res = await Student.mark({
        cgpa,
        active_backlog: backlog,
        backlog_history: history,
      });
      console.log('res.data', res.data);
      if (res.status === 200) {
        return res.data.marks;
      } else {
        return thunkAPI.rejectWithValue(res.data.error[0].message);
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

export const updateEducation = createAsyncThunk(
  'user/updateEducation',
  async (education, thunkAPI) => {
    const {
      tenth_board,
      tenth_percentage,
      twelfth_board,
      twelfth_percentage,
      grad_course,
      grad_percentage,
    } = education;
    try {
      const res = await Student.education({
        tenth_board,
        tenth_percentage,
        twelfth_board,
        twelfth_percentage,
        grad_course,
        grad_percentage,
      });
      console.log('res.data', res.data);
      if (res.status === 200) {
        return res.data.education;
      } else {
        return thunkAPI.rejectWithValue(res.data.error[0].message);
      }
    } catch (error) {
      console.log('user/updateEducation error');
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(load.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(load.rejected, (state, action) => {
      console.log('load.rejected', action.payload);
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(update.rejected, (state, action) => {
      console.log('update.rejected', action.payload);
      state.error = action.payload;
    });
    builder.addCase(updateMarks.fulfilled, (state, action) => {
      console.log('updateMarks.fulfilled', action.payload);
      // state.user = action.payload;
    });
    builder.addCase(updateMarks.rejected, (state, action) => {
      console.log('updateMarks.rejected', action.payload);
      state.error = action.payload;
    });
    builder.addCase(updateEducation.fulfilled, (state, action) => {
      console.log('updateEducation.fulfilled', action.payload);
      // state.user = action.payload;
    });
    builder.addCase(updateEducation.rejected, (state, action) => {
      console.log('updateEducation.rejected', action.payload);
      state.error = action.payload;
    });
  },
});

export const {clearUser} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
