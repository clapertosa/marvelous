import gql from "graphql-tag";

export const CHANGE_NAME_MUTATION = gql`
  mutation CHANGE_NAME_MUTATION($name: String!) {
    changeName(name: $name)
  }
`;

export const CHANGE_EMAIL_MUTATION = gql`
  mutation CHANGE_EMAIL_MUTATION($email: String!, $emailConfirm: String!) {
    changeEmail(email: $email, emailConfirm: $emailConfirm)
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION(
    $oldPassword: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    changePassword(
      oldPassword: $oldPassword
      password: $password
      passwordConfirm: $passwordConfirm
    )
  }
`;

export const CHANGE_AVATAR_MUTATION = gql`
  mutation CHANGE_AVATAR_MUTATION($avatar: String!) {
    changeAvatar(avatar: $avatar)
  }
`;
