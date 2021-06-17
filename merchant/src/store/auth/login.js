import validator from 'validator';
import routes from '../../common/routes';
import axiosInstance from '../../common/axios';

import { notificationActions } from '../notification';

export const loginAction = (data) => {
  return async (dispatch) => {
    const isEmail = validator.isEmail(data.usernameOrEmail);
    const path = routes.api.login.path;
    const payload = routes.api.login.payload;
    if (isEmail) {
      payload.username = '';
      payload.email = data.usernameOrEmail;
      payload.password = data.password;
    } else {
      payload.email = '';
      payload.username = data.usernameOrEmail;
      payload.password = data.password;
    }
    try {
      const { data } = await axiosInstance.post(path, payload);
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(
        notificationActions.open({
          type: 'success',
          msg: 'You have logged in successfully',
        })
      );
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
