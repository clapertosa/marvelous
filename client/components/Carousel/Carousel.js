import Swiper from "react-id-swiper";
import swiperStyles from "react-id-swiper/src/styles/scss/swiper.scss";
import "./Carousel.scss";

const Carousel = props => {
  const params = {
    containerClass: swiperStyles["swiper-container"],
    wrapperClass: swiperStyles["swiper-wrapper"],
    slideClass: swiperStyles["swiper-slide"],
    pagination: props.pagination ? swiperStyles["swiper-pagination"] : {},
    navigation: {
      // props.arrow: Show or hide arrows
      nextEl: props.arrows ? swiperStyles["swiper-button-next"] : null,
      prevEl: props.arrows ? swiperStyles["swiper-button-prev"] : null
    },
    scrollbar: props.scrollbar ? swiperStyles["swiper-scrollbar"] : {},
    autoplay: props.autoplay,
    disableOnInteraction: props.disableOnInteraction,
    paginationClickable: true,
    effect: props.effect,
    slidesPerView: props.slidesPerView,
    loop: props.loop, // On last slides you can continue swiping and it will restart from the start
    loopedSlides: props.loopedSlides,
    allowTouchMove: props.allowTouchMove,
    speed: props.speed,
    breakpoints: props.breakpoints
  };

  return <Swiper {...params}>{props.children}</Swiper>;
};

export default Carousel;
