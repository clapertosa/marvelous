import styles from "./Info.scss";

const Info = props => {
  return (
    <div className={styles["grid-container"]}>
      <div className={styles.name}>
        <h1>{props.name}</h1>
      </div>
      <div className={styles.description}>
        <span>{props.description}</span>
      </div>
    </div>
  );
};

export default Info;
