// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper and modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

// Install modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
  swiperRoot: {
    maxHeight: '100%',
  },
}));

const Carousel = ({ items = [] }) => {
  const classes = useStyles();

  const isEmpty = !items.length;

  return (
    <>
      {isEmpty ? null : (
        <Container maxWidth="xl">
          <Swiper
            setWrapperSize
            className={classes.swiperRoot}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              // when window width is >= 960
              960: {
                slidesPerView: 4,
              },
              1080: {
                slidesPerView: 5,
              },
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            navigation
            centeredSlides
            centeredSlidesBounds
            autoHeight
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={true}
          >
            {items.map((item, index) => (
              <SwiperSlide className={classes.swiperSlide} key={index}>
                {item}
              </SwiperSlide>
            ))}
            ...
          </Swiper>
        </Container>
      )}
    </>
  );
};

export default Carousel;
