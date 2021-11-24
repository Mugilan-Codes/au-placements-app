import {createSlice} from '@reduxjs/toolkit';

// TODO: load(), updateMarks(), updateEducation()
// TODO: user state, mark state, education state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {},
});

export default userSlice.reducer;
