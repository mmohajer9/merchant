import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {};

// we can mutate state directly in just this format not any where else!
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    increment(currentState) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
