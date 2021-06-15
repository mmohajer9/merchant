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
} from '@material-ui/core';

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

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
        >
          Login
        </Button>
      </CardActions>
    </form>
  );
};

export default Login;
