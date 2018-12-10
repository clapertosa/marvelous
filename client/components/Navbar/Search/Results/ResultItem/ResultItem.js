import Link from "next/link";
import styles from "./ResultItem.scss";

const ResultItem = ({ id, category, name, image, imageExtension }) => {
  return (
    <li className={styles.container}>
      <Link href={`/${category === "Character" ? "character" : "comic"}/${id}`}>
        <a>
          <div className={styles["grid-container"]}>
            <div className={styles.image}>
              <img
                src={`${image}/portrait_medium.${imageExtension}`}
                alt={`${name}'s thumbnail`}
              />
            </div>
            <div className={styles.title}>{name}</div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ResultItem;
