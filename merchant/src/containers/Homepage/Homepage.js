import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import getUserRemoteInfo from '../../store/auth/getUserRemoteInfo';

import { Box } from '@material-ui/core';
import Carousel from '../../components/Carousel/Carousel';

const Homepage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRemoteInfo());
    dispatch(authActions.getUserLocalInfo());
  }, [dispatch]);

  return (
    <Box>
      <Carousel />
    </Box>
  );
};

export default Homepage;
