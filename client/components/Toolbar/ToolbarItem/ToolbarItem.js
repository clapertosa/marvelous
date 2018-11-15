import Link from "next/link";
import styles from "./ToolbarItem.scss";

const ToolbarItem = props => {
  return (
    <Link>
      <a className={styles.item} href="#">
        {props.children}
      </a>
    </Link>
  );
};

export default ToolbarItem;
