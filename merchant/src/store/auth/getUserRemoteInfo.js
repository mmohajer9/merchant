import routes from '../../common/routes';
import { authActions } from '.';
import getAxiosInstance from '../../common/axios';

export const getUserRemoteInfo = () => {
  return async (dispatch, getState) => {
    const axios = getAxiosInstance();
    const path = routes.api.userDetail.path;

    try {
      const { data } = await axios.get(path);
      await dispatch(authActions.setUserInfo({ user: data }));
    } catch (error) {}
  };
};

export default getUserRemoteInfo;
