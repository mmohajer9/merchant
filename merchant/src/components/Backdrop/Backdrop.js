import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const { screenLoading } = useSelector((state) => state.setting);

  return (
    <Backdrop className={classes.backdrop} open={screenLoading}>
      <CircularProgress size={200} color="inherit" />
    </Backdrop>
  );
}
