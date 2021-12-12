import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Student} from 'api';

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, thunkAPI) => {
    try {
      const res = await Student.login(email, password);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.error.message);
      }
    } catch (error) {
      console.log('auth/login error');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({register_no, name, email, password, confirm_password}, thunkAPI) => {
    try {
      const res = await Student.register({
        register_no,
        name,
        email,
        password,
        confirm_password,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.error.message);
      }
    } catch (error) {
      console.log('auth/register error');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    accessToken: null,
    refreshToken: null,
    errorMessage: '',
  },
  reducers: {
    logout: (state) => {
      state.isLoading = true;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.errorMessage = '';
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.errorMessage = '';
    },
    clearError: (state) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.errorMessage = action.payload || action.error.message;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.errorMessage = action.payload || action.error.message;
    });
  },
});

export const {logout, clearAuth, clearError} = authSlice.actions;

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectErrorMessage = (state) => state.auth.errorMessage;

export default authSlice.reducer;
