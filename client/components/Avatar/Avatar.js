import styles from "./Avatar.scss";

const Avatar = props => {
  return (
    <div
      className={[
        styles.container,
        props.navbar ? styles.navbar : styles.dashboard
      ].join(" ")}
    >
      <img
        className={styles.avatar}
        src={props.avatar || "/static/images/defaultAvatar.png"}
      />
    </div>
  );
};

export default Avatar;
