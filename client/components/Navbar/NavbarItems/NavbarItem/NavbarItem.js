import Link from "next/link";
import styles from "./NavbarItem.scss";

const NavbarItem = props => {
  return (
    <Link href={props.url}>
      <a className={styles.item}>{props.children}</a>
    </Link>
  );
};

export default NavbarItem;
