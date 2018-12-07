import { CURRENT_USER_QUERY } from "../hoc/User/User";

export default apolloClient =>
  apolloClient
    .query({
      query: CURRENT_USER_QUERY
    })
    .then(({ data }) => {
      return { userLoggedIn: data };
    })
    .catch(() => {
      // Fail gracefully
      return { userLoggedIn: {} };
    });
