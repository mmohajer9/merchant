import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';

const initialShopState = {};

// we can mutate state directly in just this format not any where else!
const shopSlice = createSlice({
  name: 'shop',
  initialState: initialShopState,
  reducers: {},
});

export const shopActions = shopSlice.actions;

export default shopSlice.reducer;
