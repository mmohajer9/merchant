import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../common/routes';
// import { authActions } from '.';
import getAxiosInstance from '../../common/axios';

const getUserRemoteInfo = createAsyncThunk(
  'auth/getUserRemoteInfo',
  async (arg, thunkAPI) => {
    const axios = getAxiosInstance();
    const path = routes.api.userDetail.path;

    try {
      const { data } = await axios.get(path);
      return arg;
      // await dispatch(authActions.setUserInfo({ user: data }));
    } catch (error) {}
  }
);

export default getUserRemoteInfo;
