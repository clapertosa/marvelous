import ToolbarItem from "./ToolbarItem/ToolbarItem";
import styles from "./Toolbar.scss";

const Toolbar = props => {
  return props.sideDrawer ? (
    <div className={styles["container-mobile"]}>
      <div className={styles.toolbar}>
        <ToolbarItem url="characters">Characters</ToolbarItem>
        <ToolbarItem url="comics">Comics</ToolbarItem>
        <ToolbarItem url="events">Events</ToolbarItem>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <ToolbarItem url="characters">Characters</ToolbarItem>
        <ToolbarItem url="comics">Comics</ToolbarItem>
        <ToolbarItem url="events">Events</ToolbarItem>
      </div>
    </div>
  );
};

export default Toolbar;
