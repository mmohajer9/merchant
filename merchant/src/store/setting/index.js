import { createSlice } from '@reduxjs/toolkit';

const initialSettingState = {
  theme: 'light',
};

// we can mutate state directly in just this format not any where else!
const settingSlice = createSlice({
  name: 'setting',
  initialState: initialSettingState,
  reducers: {
    setDarkTheme(currentState) {
      currentState.theme = 'dark';
    },
    setLightTheme(currentState) {
      currentState.theme = 'light';
    },
    setDefaultTheme(currentState) {
      currentState.theme = 'default';
    },
  },
});

export const settingActions = settingSlice.actions;

export default settingSlice.reducer;
