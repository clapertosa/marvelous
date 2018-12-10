import styles from "./Backdrop.scss";

const Backdrop = props => {
  let touchStart, touchEnd;

  return (
    <div
      onClick={props.closeSideDrawer}
      className={[
        styles.backdrop,
        props.show ? styles.display : styles.hide
      ].join(" ")}
      onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
      onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
      onTouchEnd={() =>
        touchEnd < touchStart ? props.closeSideDrawer() : null
      }
    />
  );
};

export default Backdrop;
