import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';


import Snackbar from '@material-ui/core/Snackbar';

import validator from 'validator';

import axiosInstance from '../../common/axios';
import routes from '../../common/routes';
import { useHistory } from 'react-router';

import MuiAlert from '@material-ui/lab/Alert';
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  cardContentRoot: {
    padding: theme.spacing(2),
  },
  cardActions: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  usernameOrEmail: yup
    .string('Enter your username or email')
    .required('Either username or email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    type: '',
    msg: '',
  });

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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

        localStorage.setItem('userInfo', JSON.stringify(data));

        setSnackbarState({
          open: true,
          type: 'success',
          msg: 'You have logged in successfully',
        });
        setTimeout(() => {
          setSnackbarState({
            open: false,
            type: 'success',
          });
          history.push(routes.profile);
        }, 1000);
      } catch (error) {
        setSnackbarState({
          open: true,
          type: 'error',
          msg: 'You can not log in with these credentials',
        });
        setTimeout(
          () =>
            setSnackbarState({
              open: false,
              type: 'error',
            }),
          2000
        );
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent className={classes.cardContentRoot}>
        <FormControl className={classes.formControl}>
          <TextField
            id="usernameOrEmail"
            label="Username or Email"
            variant="standard"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
            }
            error={
              formik.touched.usernameOrEmail &&
              Boolean(formik.errors.usernameOrEmail)
            }
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </FormControl>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <CircularProgress color="secondary" />
          ) : (
            'Login'
          )}
        </Button>
      </CardActions>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarState.open}
      >
        {snackbarState.open ? (
          <Alert severity={snackbarState.type}>{snackbarState.msg}</Alert>
        ) : null}
      </Snackbar>
    </form>
  );
};

export default Login;
