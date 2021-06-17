import { createSlice } from '@reduxjs/toolkit';

const initialSettingState = {};

// we can mutate state directly in just this format not any where else!
const settingSlice = createSlice({
  name: 'setting',
  initialState: initialSettingState,
  reducers: {
    increment(currentState) {},
  },
});

export const settingActions = settingSlice.actions;

export default settingSlice.reducer;
