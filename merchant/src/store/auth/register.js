import routes from '../../common/routes';

import { authActions } from '.';
import { toast } from 'react-toastify';

export const registerAction = ({ values, history}) => {
  return async (dispatch) => {
    const path = routes.api.registration.path;
    const payload = routes.api.registration.payload;
    payload.username = values.username;
    payload.password1 = values.password;
    payload.password2 = values.confirmPassword;
    payload.email = values.email;

    try {
      const { data } = await axios.post(path, payload);
      dispatch(authActions.setLoginInfo(data));
      toast.success('You have signed up Successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      toast.info('Activation Email has been sent, Check your mailbox!', {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push(routes.profile);
    } catch (error) {
      const errorMessages = error.response.data;
      for (const field in errorMessages) {
        const message = `${field}: ${errorMessages[field][0]}`;
        toast.error(message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
};

export default registerAction;
