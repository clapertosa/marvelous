import styles from "./Cover.scss";

const Cover = props => {
  return (
    <div className={styles["cover-container"]}>
      <img src={props.image} alt="Comic cover image" />
    </div>
  );
};

export default Cover;
