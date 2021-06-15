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
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword = (props) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
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
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            type="email"
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
        >
          Submit
        </Button>
      </CardActions>
    </form>
  );
};

export default ForgotPassword;
