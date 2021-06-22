import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
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
  usernameOrEmail: yup
    .string('Enter your username or email')
    .required('Either username or email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const Login = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(authActions.login({ values, history }));
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
    </form>
  );
};

export default Login;
