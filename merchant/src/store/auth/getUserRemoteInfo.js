// import { toast } from 'react-toastify';
import routes from '../../common/routes';

import { authActions } from '.';

export const getUserRemoteInfo = () => {
  return async (dispatch) => {
    const path = routes.api.userDetail.path;

    try {
      const { data } = await axios.get(path);
      dispatch(authActions.setUserInfo({ user: data }));
    } catch (error) {}
  };
};

export default getUserRemoteInfo;
