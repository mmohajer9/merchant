import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import getUserRemoteInfo from '../../store/auth/getUserRemoteInfo';
import fetchProductsAction from '../../store/home/fetchProductsAction';

import { Box } from '@material-ui/core';
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../../components/Product/ProductCard';

const Homepage = (props) => {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home);

  const carouselItems = home.carousel.items.map((item, index) => (
    <ProductCard key={index} item={item} />
  ));

  useEffect(() => {
    dispatch(getUserRemoteInfo());
    dispatch(authActions.getUserLocalInfo());

    dispatch(fetchProductsAction({}));
  }, [dispatch]);

  return (
    <Box>
      <Carousel items={carouselItems} />
    </Box>
  );
};

export default Homepage;
