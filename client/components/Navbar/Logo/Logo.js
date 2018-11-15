import styles from "./Logo.scss";

const Logo = props => {
  return props.small ? (
    <div className={styles.logo}>
      <h1>🕷</h1>
    </div>
  ) : (
    <div className={styles.logo}>
      <h1>🕸 MARVELOUS 🕷</h1>
    </div>
  );
};

export default Logo;
