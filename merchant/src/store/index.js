import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/';
import cartReducer from './cart/';
import settingReducer from './setting/';
import homeReducer from './home';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    setting: settingReducer,
    home: homeReducer,
  },
});

export default store;
