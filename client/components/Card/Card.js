import Link from "next/link";
import swiperStyles from "react-id-swiper/src/styles/scss/swiper.scss";
import styles from "./Card.scss";

const Card = props => {
  return (
    <div
      className={[styles["grid-container"], swiperStyles["swiper-slide"]].join(
        " "
      )}
    >
      <Link
        as={`/${props.url}/${props.id}`}
        href={`/${props.url}?id=${props.id}`}
      >
        <a>
          <div className={styles["image-container"]}>
            <img
              src={`${props.image}/portrait_uncanny.${props.imageExtension}`}
              alt={`${props.title} thumbnail`}
            />
          </div>
          <div className={styles.caption}>
            <div className={styles.main}>{props.title}</div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Card;
