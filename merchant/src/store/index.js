import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/';
import cartReducer from './cart/';
import settingReducer from './setting/';
import notificationReducer from './notification/';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    setting: settingReducer,
    notification: notificationReducer,
  },
});

export default store;
