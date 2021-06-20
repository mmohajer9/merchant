import validator from 'validator';
import { toast } from 'react-toastify';
import routes from '../../common/routes';

import { authActions } from '.';
import getAxiosInstance from '../../common/axios';


export const login = ({ values, history }) => {
  return async (dispatch) => {
    const axios = getAxiosInstance();
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
      const { data } = await axios.post(path, payload);
      await dispatch(authActions.setLoginInfo(data));
      toast.success('You have logged in Successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push(routes.profile);
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

export default login;
