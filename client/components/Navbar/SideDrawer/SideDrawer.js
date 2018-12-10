import NavbarItems from "../../Navbar/NavbarItems/NavbarItems";
import styles from "./SideDrawer.scss";

const SideDrawer = props => {
  let touchStart, touchEnd;

  return (
    <>
      <div
        className={[
          styles.container,
          props.show ? styles.display : styles.hide
        ].join(" ")}
        onTouchStart={touch => (touchStart = touch.touches[0].screenX)}
        onTouchMove={touch => (touchEnd = touch.touches[0].screenX)}
        onTouchEnd={() =>
          touchEnd < touchStart ? props.closeSideDrawer() : null
        }
      >
        <NavbarItems sideDrawer />
        <div className={styles.background} />
      </div>
    </>
  );
};

export default SideDrawer;
