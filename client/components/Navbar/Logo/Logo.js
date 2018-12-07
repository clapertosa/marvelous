import Link from "next/link";
import styles from "./Logo.scss";

const Logo = props => {
  return props.small ? (
    <div className={styles.logo}>
      <h1>
        <Link href="/">
          <a>M</a>
        </Link>
      </h1>
    </div>
  ) : (
    <div className={styles.logo}>
      <h1>
        <Link href="/">
          <a>MARVELOUS</a>
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
