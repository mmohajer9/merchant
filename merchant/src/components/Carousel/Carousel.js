// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper and modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// import { makeStyles } from '@material-ui/core';

// Install modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// const useStyles = makeStyles((theme) => ({}));

const Carousel = ({ items = [] }) => {
  // const classes = useStyles();

  const isEmpty = !items.length;

  return (
    <>
      {isEmpty ? null : (
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          navigation
          centeredSlides
          centeredSlidesBounds
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          // pagination={true}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>{item}</SwiperSlide>
          ))}
          ...
        </Swiper>
      )}
    </>
  );
};

export default Carousel;
