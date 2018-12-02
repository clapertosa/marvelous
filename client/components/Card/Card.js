import styles from "./Card.scss";

const Card = props => {
  return (
    <div className={styles["grid-container"]}>
      <div style={{ maxWidth: "150px" }} className={styles["image-container"]}>
        <img
          style={{ width: "100%" }}
          src="https://terrigen-cdn-dev.marvel.com/content/prod/1x/_001avn_com_crd_01.jpg"
          alt=""
        />
      </div>
      <div className={styles.caption}>
        <div className={styles.main}>Doctor Strange</div>
        <div className={styles["sub-main"]}>Stephen Strange</div>
      </div>
    </div>
  );
};

export default Card;
