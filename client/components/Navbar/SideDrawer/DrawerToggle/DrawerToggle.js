import styles from "./DrawerToggle.scss";

const DrawerToggle = props => {
  return (
    <div onClick={props.clicked} className={styles.drawer}>
      <i className="icon-menu" />
    </div>
  );
};

export default DrawerToggle;
