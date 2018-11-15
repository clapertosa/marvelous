import ToolbarItem from "./ToolbarItem/ToolbarItem";
import styles from "./Toolbar.scss";

const Toolbar = props => {
  return props.sideDrawer ? (
    <div className={styles["container-mobile"]}>
      <div className={styles.toolbar}>
        <ToolbarItem>Characters</ToolbarItem>
        <ToolbarItem>Comics</ToolbarItem>
        <ToolbarItem>Events</ToolbarItem>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <ToolbarItem>Characters</ToolbarItem>
        <ToolbarItem>Comics</ToolbarItem>
        <ToolbarItem>Events</ToolbarItem>
      </div>
    </div>
  );
};

export default Toolbar;
