import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/';
import cartReducer from './cart/';
import settingReducer from './setting/';
import homeReducer from './home';
import shop from './shop';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    setting: settingReducer,
    home: homeReducer,
    shop: shop,
  },
});

export default store;
