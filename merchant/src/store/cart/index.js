import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: [],
};

// we can mutate state directly in just this format not any where else!
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart(currentState, { payload }) {
      currentState.items.push(payload.item);
    },
    removeCartItem(currentState, { payload }) {
      const id = payload.id;
      currentState.items = currentState.items.filter((item) => item.id !== id);
    },
    updateCartItem(currentState, { payload }) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
