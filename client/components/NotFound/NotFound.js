import Head from "next/head";
import Link from "next/link";
import styles from "./NotFound.scss";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Marvelous 🚀 | Not Found</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.message}>
          Whoooooooops we can't find this page 🙄
        </h1>
        <div className={styles.back}>
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
