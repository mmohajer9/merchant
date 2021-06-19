import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialAuthState = {
  isAuthenticated: false,
  userInfo: {},
  token: {},
  axios: axios.create({
    baseURL: 'http://127.0.0.1:8000',
  }),
};

// we can mutate state directly in just this format not any where else!
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    setUserInfo(currentState, { payload }) {
      currentState.userInfo = payload.user;
      currentState.isAuthenticated = true;
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
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      currentState.userInfo = {};
      currentState.token = {};
      currentState.isAuthenticated = false;
    },
    getUserLocalInfo(currentState) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        currentState.userInfo = userInfo ? userInfo : {};
        currentState.isAuthenticated = userInfo ? true : false;
      } catch (error) {
        currentState.userInfo = {};
        currentState.isAuthenticated = false;
      }
    },
    setAxiosInstance(currentState) {
      if (currentState.isAuthenticated && currentState.token?.access) {
        const headers = {
          Authorization: `Bearer ${currentState.token.access}`,
        };
        const instance = axios.create({
          baseURL: 'http://127.0.0.1:8000',
          headers: headers,
        });
        currentState.axios = instance;
      } else {
        currentState.axios = axios.create({
          baseURL: 'http://127.0.0.1:8000',
        });
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
