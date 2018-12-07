import styles from "./Poster.scss";

const Poster = props => {
  return (
    <div className={styles["poster-container"]}>
      <img src={props.image} alt="Character poster" />
    </div>
  );
};

export default Poster;
