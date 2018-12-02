import Router from "next/router";
import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../../hoc/User/User";

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

const Logout = () => {
  return (
    <Mutation
      mutation={LOGOUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(logout, { data, error, loading }) => {
        logout();
        if (data) Router.push("/");
        return null;
      }}
    </Mutation>
  );
};

Logout.getInitialProps = async context => {
  const { userLoggedIn } = await checkLoggedIn(context.apolloClient);

  if (!userLoggedIn.currentUser) {
    redirect(context, "/");
  }

  return {};
};

export default Logout;
