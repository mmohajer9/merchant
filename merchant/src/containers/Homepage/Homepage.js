import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import getUserRemoteInfo from '../../store/auth/getUserRemoteInfo';

const Homepage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRemoteInfo());
    dispatch(authActions.getUserLocalInfo());
  }, [dispatch]);

  return <></>;
};

export default Homepage;
