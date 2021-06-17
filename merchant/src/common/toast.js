import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../store/notification';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Toast = (props) => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(notificationActions.close());
  };

  return (
    <Snackbar
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: notification.vertical,
        horizontal: notification.horizontal,
      }}
      open={notification.open}
    >
      {notification.open ? (
        <Alert severity={notification.type}>{notification.msg}</Alert>
      ) : null}
    </Snackbar>
  );
};

export default Toast;
