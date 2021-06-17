import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {};

// we can mutate state directly in just this format not any where else!
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    increment(currentState, action) {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
