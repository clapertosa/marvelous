import styles from "./Backdrop.scss";

const Backdrop = props => {
  return (
    <div
      onClick={props.clicked}
      className={[
        styles.backdrop,
        props.show ? styles.display : styles.hide
      ].join(" ")}
    />
  );
};

export default Backdrop;
