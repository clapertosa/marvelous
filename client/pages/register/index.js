import Head from "next/head";
import RegisterForm from "../../components/Form/RegisterForm/RegisterForm";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import styles from "./index.scss";

const Register = () => {
  return (
    <>
      <Head>
        <title>Marvelous 🚀 | Sign Up</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

Register.getInitialProps = async context => {
  const { userLoggedIn } = await checkLoggedIn(context.apolloClient);

  if (userLoggedIn.currentUser) {
    redirect(context, "/");
  }

  return {};
};

export default Register;
