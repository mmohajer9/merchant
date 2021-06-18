import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  userInfo: {},
};

// we can mutate state directly in just this format not any where else!
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    setUserInfo(currentState, { payload }) {
      currentState.userInfo = payload;
      currentState.isAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(payload));
    },
    logout(currentState) {
      currentState.userInfo = {};
      currentState.isAuthenticated = false;
      localStorage.removeItem('userInfo');
    },
    getUserInfo(currentState) {
      try {
        currentState.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        currentState.isAuthenticated = true;
      } catch (error) {
        currentState.userInfo = {};
        currentState.isAuthenticated = false;
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
