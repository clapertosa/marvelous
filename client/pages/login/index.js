import LoginForm from "../../components/Form/LoginForm/LoginForm";
import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";
import styles from "./index.scss";

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <LoginForm />
      </div>
    </div>
  );
};

Login.getInitialProps = async context => {
  const { userLoggedIn } = await checkLoggedIn(context.apolloClient);

  if (userLoggedIn.currentUser) {
    redirect(context, "/");
  }

  return {};
};

export default Login;
