import { createStore, combineReducers } from 'redux';

const initialState1 = {};
const initialState2 = {};

//* DO NOT EVER MUTATE STATE DIRECTLY, INSTEAD RETURN A NEW ONE
const reducer1 = (state = initialState1, { type, payload }) => {
  switch (type) {
    case 'typeName':
      return { ...state, ...payload };

    default:
      return state;
  }
};

const reducer2 = (state = initialState2, { type, payload }) => {
  switch (type) {
    case 'typeName':
      return { ...state, ...payload };

    default:
      return state;
  }
};

const combinedReducer = combineReducers(reducer1, reducer2);

const store = createStore(combinedReducer);

export default store;
