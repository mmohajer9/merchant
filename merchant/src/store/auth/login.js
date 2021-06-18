import validator from 'validator';
import routes from '../../common/routes';
import axiosInstance from '../../common/axios';

import { notificationActions } from '../notification';
import { authActions } from '.';

export const loginAction = ({ values, history }) => {
  return async (dispatch) => {
    const isEmail = validator.isEmail(values.usernameOrEmail);
    const path = routes.api.login.path;
    const payload = routes.api.login.payload;
    if (isEmail) {
      payload.username = '';
      payload.email = values.usernameOrEmail;
      payload.password = values.password;
    } else {
      payload.email = '';
      payload.username = values.usernameOrEmail;
      payload.password = values.password;
    }
    try {
      const { data } = await axiosInstance.post(path, payload);
      dispatch(authActions.setUserInfo(data));
      dispatch(
        notificationActions.open({
          type: 'success',
          msg: 'You have logged in successfully',
        })
      );
      setTimeout(() => history.push(routes.profile), 2000);
    } catch (error) {
      dispatch(
        notificationActions.open({
          type: 'error',
          msg: 'You can not log in with these credentials',
        })
      );
    }
  };
};

export default loginAction;
