import styles from "./Info.scss";

const Info = props => {
  return (
    <div className={styles["grid-container"]}>
      <div className={styles.title}>
        <h1>{props.title}</h1>
      </div>
      <div className={styles.published}>
        <h2>Published:</h2>
        <span>{new Date(props.release).toLocaleDateString("en-US")}</span>
      </div>
      {props.writer ? (
        <div className={styles.writer}>
          <h2>Writer:</h2>
          <span>{props.writer}</span>
        </div>
      ) : null}
      {props.price ? (
        <div className={styles.price}>
          <h2>Price:</h2>
          <span>${props.price}</span>
        </div>
      ) : null}
      <div className={styles["cover-artist"]}>
        <h2>Cover Artist:</h2>
        <span>{props.coverArtist}</span>
      </div>
      <div className={styles.description}>
        <span>{props.description}</span>
      </div>
    </div>
  );
};

export default Info;
