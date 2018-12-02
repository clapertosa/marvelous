import { Query } from "react-apollo";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      userId
      name
      email
      avatar
      activated
      created_at
    }
  }
`;

const User = props => {
  return (
    <Query {...props} query={CURRENT_USER_QUERY}>
      {payload => props.children(payload)}
    </Query>
  );
};

export { CURRENT_USER_QUERY };
export default User;
