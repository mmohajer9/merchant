import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
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
      await dispatch(authActions.forgotPassword({ values, history }));
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
