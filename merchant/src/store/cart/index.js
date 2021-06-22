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
      if (item && item.count < payload.item.quantity) {
        // updating its value
        item.count++;
        item.properties = payload.item;
        localStorage.setItem('cart', JSON.stringify(currentState));
        toast.info(`Product has been added to Cart : ${payload.item.name}`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (item && item.count >= payload.item.quantity) {
        toast.error(`Not Available in the stock : ${payload.item.name}`, {
          position: 'top-right',
          autoClose: 1000,
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
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    subtractCartItem(currentState, { payload }) {
      const item = _.find(currentState.items, (o) => {
        return o.properties.id === payload.item.id;
      });
      if (item && item.count > 1) {
        // updating its value
        item.count--;
        item.properties = payload.item;
        localStorage.setItem('cart', JSON.stringify(currentState));
        toast.dark(
          `One Item of ${payload.item.name} Has Been Removed From The Cart`,
          {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    },
    removeCartItem(currentState, { payload }) {
      // eslint-disable-next-line no-unused-vars
      const removedItems = _.remove(currentState.items, (o) => {
        return o.properties.id === payload.item.id;
      });
      localStorage.setItem('cart', JSON.stringify(currentState));
      toast.dark(
        `Item : ${payload.item.name} Has Been Removed From The Cart`,
        {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
