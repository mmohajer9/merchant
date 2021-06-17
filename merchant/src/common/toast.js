import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Toast = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
      open={props.open}
    >
      {props.open ? <Alert severity={props.type}>{props.msg}</Alert> : null}
    </Snackbar>
  );
};

export default Toast;
