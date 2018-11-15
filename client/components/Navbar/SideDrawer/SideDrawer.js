import NavbarItems from "../../Navbar/NavbarItems/NavbarItems";
import Toolbar from "../../Toolbar/Toolbar";
import styles from "./SideDrawer.scss";

const SideDrawer = props => {
  return (
    <div
      className={[
        styles.container,
        props.show ? styles.display : styles.hide
      ].join(" ")}
    >
      <NavbarItems sideDrawer />
      <Toolbar sideDrawer />
    </div>
  );
};

export default SideDrawer;
