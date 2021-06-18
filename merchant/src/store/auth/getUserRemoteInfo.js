// import { toast } from 'react-toastify';
import routes from '../../common/routes';
import axiosInstance from '../../common/axios';

import { authActions } from '.';

export const getUserRemoteInfo = () => {
  return async (dispatch) => {
    const path = routes.api.userDetail.path;

    try {
      const { data } = await axiosInstance.get(path);
      dispatch(authActions.setUserInfo({ user: data }));
    } catch (error) {}
  };
};

export default getUserRemoteInfo;
