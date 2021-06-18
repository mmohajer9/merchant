import { createSlice } from '@reduxjs/toolkit';

const initialHomeState = {
  carousel: {
    items: [],
    next: '',
    previous: '',
    count: '',
  },
};

// we can mutate state directly in just this format not any where else!
const homeSlice = createSlice({
  name: 'homepage',
  initialState: initialHomeState,
  reducers: {
    setCarouselItems(currentState, { payload }) {
      currentState.carousel.items = payload.results;
      currentState.carousel.next = payload.next;
      currentState.carousel.previous = payload.previous;
      currentState.carousel.count = payload.count;
    },
    appendCarouselItems(currentState, { payload }) {
      currentState.carousel.items.push(...payload.results);
      currentState.carousel.next = payload.next;
      currentState.carousel.previous = payload.previous;
      currentState.carousel.count = payload.count;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
