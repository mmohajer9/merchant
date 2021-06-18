import routes from '../../common/routes';
import axiosInstance from '../../common/axios';

import { authActions } from '.';
import { toast } from 'react-toastify';

export const forgotPasswordAction = ({ values, history }) => {
  return async (dispatch) => {
    const path = routes.api.registration.path;
    const payload = routes.api.registration.payload;
  };
};

export default forgotPasswordAction;
