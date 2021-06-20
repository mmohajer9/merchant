import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  userInfo: {},
  token: {},
};

// we can mutate state directly in just this format not any where else!
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    setUserInfo(currentState, { payload }) {
      currentState.userInfo = payload.user;
      localStorage.setItem('userInfo', JSON.stringify(payload.user));
    },
    setTokenInfo(currentState, { payload }) {
      currentState.token = {
        access: payload.access_token,
        refresh: payload.refresh_token,
      };
      currentState.isAuthenticated = true;
      localStorage.setItem('token', JSON.stringify(currentState.token));
    },
    setLoginInfo(currentState, { payload }) {
      currentState.userInfo = payload.user;
      currentState.token = {
        access: payload.access_token,
        refresh: payload.refresh_token,
      };
      currentState.isAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(payload.user));
      localStorage.setItem('token', JSON.stringify(currentState.token));
    },
    logout(currentState) {
      localStorage.clear();
      currentState.userInfo = {};
      currentState.token = {};
      currentState.isAuthenticated = false;
    },
    getUserLocalInfo(currentState) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        currentState.userInfo = userInfo ? userInfo : {};
      } catch (error) {
        currentState.userInfo = {};
      }
    },
    getUserTokenInfo(currentState) {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        currentState.token = token ? token : {};
        currentState.isAuthenticated = token ? true : false;
      } catch (error) {
        currentState.userInfo = {};
        currentState.isAuthenticated = false;
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
