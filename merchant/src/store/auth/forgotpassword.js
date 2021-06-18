import routes from '../../common/routes';
import axiosInstance from '../../common/axios';

import { toast } from 'react-toastify';

export const forgotPasswordAction = ({ values, history }) => {
  return async (dispatch) => {
    const path = routes.api.resetPassword.path;
    const payload = routes.api.resetPassword.payload;
    payload.email = values.email;
    try {
      const { data } = await axiosInstance.post(path, payload);
      toast.success(data.detail, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      const errorMessages = error.response.data;
      console.log(errorMessages);
      toast.error('Operation failed, Try again', {
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

export default forgotPasswordAction;
