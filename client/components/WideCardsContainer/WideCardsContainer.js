import NukaCarousel from "../Carousel/Carousel";
import styles from "./WideCardsContainer.scss";

const WideCardsContainer = props => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{props.title}</h1>
      </div>
      <div className={styles["cards-container"]}>
        <NukaCarousel slidesToShow={6} withoutControls={false}>
          {props.children}
        </NukaCarousel>
      </div>
    </div>
  );
};

export default WideCardsContainer;
