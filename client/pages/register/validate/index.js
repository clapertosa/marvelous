import gql from "graphql-tag";
import Message from "../../../components/Message/Message";
import LoginForm from "../../../components/Form/LoginForm/LoginForm";
import styles from "./index.scss";

const ACTIVATE_USER_MUTATION = gql`
  mutation ACTIVATE_USER_MUTATION($token: String!) {
    activateUser(token: $token)
  }
`;

const Validate = ({ error, activated }) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        {activated ? (
          <>
            <Message success="Your Account has been successfully activated. Please login now!" />
            <LoginForm />
          </>
        ) : (
          <Message error={error} />
        )}
      </div>
    </div>
  );
};

Validate.getInitialProps = async ({ apolloClient, query: { token } }) => {
  try {
    await apolloClient.mutate({
      mutation: ACTIVATE_USER_MUTATION,
      variables: { token }
    });
  } catch (err) {
    return { error: err, activated: false };
  }

  return { activated: true };
};

export default Validate;
