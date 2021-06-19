import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { authActions } from '../../store/auth';
import getProducts from '../../store/home/getProducts';

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
    const fetchProducts = async () => {
      await dispatch(getProducts({}));
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <Box>
      <Carousel items={carouselItems} />
    </Box>
  );
};

export default Homepage;
