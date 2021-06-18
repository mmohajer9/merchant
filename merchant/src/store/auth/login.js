import validator from 'validator';
import { toast } from 'react-toastify';
import routes from '../../common/routes';
import axiosInstance from '../../common/axios';

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
      await dispatch(authActions.setLoginInfo(data));
      toast.success('You have logged in Successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => history.push(routes.profile), 1000);
    } catch (error) {
      const errorMessage =
        error.response.data.non_field_errors[0] ||
        'Unable to log in with provided credentials.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

export default loginAction;
