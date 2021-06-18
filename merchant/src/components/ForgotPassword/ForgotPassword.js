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
import forgotPasswordAction from '../../store/auth/forgotpassword';

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
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(forgotPasswordAction({ values, history }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent className={classes.cardContentRoot}>
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
            'Submit'
          )}
        </Button>
      </CardActions>
    </form>
  );
};

export default ForgotPassword;
