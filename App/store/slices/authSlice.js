import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Student} from '../../api';
import {setAuthToken} from '../../config';

// TODO: Persist auth tokens to prevent from logging out

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, thunkAPI) => {
    const res = await Student.login(email, password);
    // setAuthToken(res.data.accessToken);
    return res.data;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({register_no, name, email, password, confirm_password}, thunkAPI) => {
    const res = await Student.register({
      register_no,
      name,
      email,
      password,
      confirm_password,
    });
    // setAuthToken(res.data.accessToken);
    return res.data;
  },
);

// TODO: Set auth token before loading auth data
export const load = createAsyncThunk('auth/load', async (_, thunkAPI) => {
  // console.log(thunkAPI.getState().auth.accessToken);
  // try {
  setAuthToken(thunkAPI.getState().auth.accessToken);
  const res = await Student.get();
  console.log(res.data);
  if (res.data.err_msg) {
    console.log('Error', res.data.err_msg);
    return thunkAPI.rejectWithValue();
  }
  return res.data;
  // } catch (error) {
  //   const message =
  //     (error.response && error.response.data && error.response.data.message) ||
  //     error.message ||
  //     error.toString();
  //   console.log({message});
  //   thunkAPI.dispatch(logout());
  // }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    user: null,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    errorMessage: '',
  },
  reducers: {
    logout: (state) => {
      state.isLoading = true;
      state.user = null;
      state.isAuthenticated = false;
      setAuthToken();
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      setAuthToken(action.payload.accessToken);
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.error);
      state.isLoading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      setAuthToken(action.payload.accessToken);
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(load.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(load.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(load.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const {logout} = authSlice.actions;

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectErrorMessage = (state) => state.auth.errorMessage;

export default authSlice.reducer;
