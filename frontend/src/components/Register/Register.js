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

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

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
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Confirm your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const Register = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(authActions.register({ values, history }));
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
    </form>
  );
};

export default Register;
