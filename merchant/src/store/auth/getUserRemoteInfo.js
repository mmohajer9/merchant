// import { toast } from 'react-toastify';
import routes from '../../common/routes';

import { authActions } from '.';

export const getUserRemoteInfo = ({ auth }) => {
  return async (dispatch) => {
    const path = routes.api.userDetail.path;

    try {
      const { data } = await auth.axios.get(path);
      dispatch(authActions.setUserInfo({ user: data }));
    } catch (error) {}
  };
};

export default getUserRemoteInfo;
