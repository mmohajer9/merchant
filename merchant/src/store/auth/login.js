import validator from 'validator';
import routes from '../../common/routes';
import axiosInstance from '../../common/axios';

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
    // try {
    //   const { data } = await axiosInstance.post(path, payload);

    //   localStorage.setItem('userInfo', JSON.stringify(data));

    //   setSnackbarState((prevState) => ({
    //     ...prevState,
    //     open: true,
    //     type: 'success',
    //     msg: 'You have logged in successfully',
    //   }));
    //   setTimeout(() => {
    //     setSnackbarState({
    //       open: false,
    //       type: 'success',
    //       horizontal: 'right',
    //       vertical: 'top',
    //     });
    //     history.push(routes.profile);
    //   }, 1000);
    // } catch (error) {
    //   setSnackbarState((prevState) => ({
    //     ...prevState,
    //     open: true,
    //     type: 'error',
    //     msg: 'You can not log in with these credentials',
    //   }));
    //   setTimeout(
    //     () =>
    //       setSnackbarState((prevState) => ({
    //         ...prevState,
    //         open: false,
    //         type: 'error',
    //       })),
    //     2000
    //   );
    // }
  };
};

export default loginAction;
