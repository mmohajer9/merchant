import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import _ from 'lodash';

const initialCartState = {
  items: [],
};

// we can mutate state directly in just this format not any where else!
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    getCartItems(currentState) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      currentState.items = cart ? cart.items : [];
    },
    addToCart(currentState, { payload }) {
      const item = _.find(currentState.items, (o) => {
        return o.properties.id === payload.item.id;
      });
      if (item && item.count < item.properties.quantity) {
        console.log(item.count, item.properties.quantity);
        // updating its value
        item.count++;
        item.properties = payload.item;
        localStorage.setItem('cart', JSON.stringify(currentState));
        toast.info(`Product has been added to Cart : ${payload.item.name}`, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (item && item.count >= item.properties.quantity) {
        toast.error(`Not Available in the stock : ${payload.item.name}`, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const newItem = { properties: payload.item, count: 1 };
        currentState.items.push(newItem);
        localStorage.setItem('cart', JSON.stringify(currentState));
        toast.info(`Product has been added to Cart : ${payload.item.name}`, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    removeCartItem(currentState, { payload }) {
      const id = payload.id;
      currentState.items = currentState.items.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(currentState));
    },
    updateCartItem(currentState, { payload }) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
