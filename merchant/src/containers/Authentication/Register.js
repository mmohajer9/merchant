import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  Snackbar,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';

import axiosInstance from '../../common/axios';
import routes from '../../common/routes';

import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
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
  username: yup.string('Enter your username').required('Username is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Confirm your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Register = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    type: '',
    msg: '',
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const path = routes.api.registration.path;
      const payload = routes.api.registration.payload;
      payload.username = values.username;
      payload.password1 = values.password;
      payload.password2 = values.confirmPassword;
      payload.email = values.email;

      console.log(payload)

      try {
        const { data } = await axiosInstance.post(path, payload);
        console.log(data);
        setSnackbarState({
          open: true,
          type: 'success',
          msg: 'You have registered successfully',
        });
        setTimeout(() => {
          setSnackbarState({
            open: false,
            type: 'success',
          });
          localStorage.setItem('userInfo', JSON.stringify(data));
          history.push(routes.profile);
        }, 1000);
      } catch (error) {
        setSnackbarState({
          open: true,
          type: 'error',
          msg: 'Registration has been failed, try again',
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
            id="username"
            label="Username"
            variant="standard"
            fullWidth
            onChange={formik.handleChange}
            helperText={formik.touched.username && formik.errors.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="password"
            label="Password"
            variant="standard"
            fullWidth
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="confirmPassword"
            label="Confirm Your Password"
            variant="standard"
            fullWidth
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
          />
        </FormControl>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <CircularProgress color="secondary" />
          ) : (
            'Register'
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

export default Register;
