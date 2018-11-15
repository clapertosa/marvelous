import Link from "next/link";
import styles from "./UserItem.scss";

const UserItem = props => {
  return (
    <Link>
      <a className={styles.item} href="#">
        {props.children}
      </a>
    </Link>
  );
};

export default UserItem;
