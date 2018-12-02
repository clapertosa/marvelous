import NewPasswordForm from "../../../components/Form/NewPasswordForm/NewPasswordForm";
import styles from "./index.scss";

const NewPassword = ({ token }) => {
  return (
    <div className={styles.wrapper}>
      <NewPasswordForm token={token} />
    </div>
  );
};

NewPassword.getInitialProps = ({ query }) => {
  return { token: query.token };
};

export default NewPassword;
