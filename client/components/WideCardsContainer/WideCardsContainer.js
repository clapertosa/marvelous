import Carousel from "../Carousel/Carousel";
import styles from "./WideCardsContainer.scss";

const WideCardsContainer = props => {
  if (props.cardsNumber <= 0) return null;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{props.title}</h1>
      </div>
      <div className={styles["cards-container"]}>
        <Carousel
          autoplay={props.autoplay}
          allowTouchMove={props.allowTouchMove}
          loop={props.loop}
          slidesPerView={props.slidesPerView}
          loopedSlides={5}
          disableOnInteraction={props.disableOnInteraction}
          effect="slide"
          speed={300}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            // when window width is <= 480px
            480: {
              slidesPerView: props.cardsNumber > 1 ? 2 : props.cardsNumber,
              spaceBetween: 20
            },
            // when window width is <= 640px
            640: {
              slidesPerView: props.cardsNumber > 2 ? 3 : props.cardsNumber,
              spaceBetween: 30
            },
            1020: {
              slidesPerView: props.cardsNumber > 3 ? 4 : props.cardsNumber,
              spaceBetween: 40
            }
          }}
        >
          {props.children}
        </Carousel>
      </div>
    </div>
  );
};

export default WideCardsContainer;
