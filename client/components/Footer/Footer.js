import styles from "./Footer.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <span className={styles.attribution}>
        <a href="http://marvel.com" target="_blank">
          Data provided by Marvel. © 2014 Marvel
        </a>
      </span>
    </div>
  );
};

export default Footer;
