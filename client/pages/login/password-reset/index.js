import Head from "next/head";
import PasswordResetForm from "../../../components/Form/PasswordResetForm/PasswordResetForm";
import styles from "./index.scss";

const PasswordReset = () => {
  return (
    <>
      <Head>
        <title>Marvelous 🚀 | Password Reset</title>
      </Head>
      <div className={styles.wrapper}>
        <PasswordResetForm />
      </div>
    </>
  );
};

export default PasswordReset;
