import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import cartReducer from './cart';
import settingReducer from './setting';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    setting: settingReducer,
  },
});

export default store;
