import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Student} from '../../api';

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (_, thunkAPI) => {
    try {
      const {data, status} = await Student.getCourses();

      if (status === 200) {
        return data;
      } else {
        console.log('course/fetchCourses data.msg');
        console.log(data.msg);
        return thunkAPI.rejectWithValue(data.msg);
      }
    } catch (error) {
      console.log('course/fetchCourses error');
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    noOfCourses: 0,
    loading: false,
    error: null,
  },
  reducers: {
    getCourses: (state, action) => {
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload.courses;
      state.noOfCourses = action.payload.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {getCourses} = courseSlice.actions;

export const selectCourses = (state) => state.course.courses;
export const selectLoading = (state) => state.course.loading;
export const selectError = (state) => state.course.error;

export default courseSlice.reducer;
