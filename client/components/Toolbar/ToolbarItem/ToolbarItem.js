import Link from "next/link";
import styles from "./ToolbarItem.scss";

const ToolbarItem = props => {
  return (
    <Link href={props.url || "#"}>
      <a className={styles.item}>{props.children}</a>
    </Link>
  );
};

export default ToolbarItem;
