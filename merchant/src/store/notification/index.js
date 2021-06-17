import { createSlice } from '@reduxjs/toolkit';

const initialNotificationState = {
  open: false,
  type: '',
  msg: '',
  horizontal: 'right',
  vertical: 'top',
};

// we can mutate state directly in just this format not any where else!
const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    open(currentState, action) {
      currentState.open = true;
      currentState.type = action.payload.type;
      currentState.msg = action.payload.msg;
    },
    close(currentState) {
      currentState.open = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
