import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Message from "../../Message/Message";
import styles from "../formStyle.scss";

const NEW_PASSWORD_MUTATION = gql`
  mutation NEW_PASSWORD_MUTATION(
    $token: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    newPassword(
      token: $token
      password: $password
      passwordConfirm: $passwordConfirm
    )
  }
`;

class PasswordReset extends Component {
  state = {
    token: this.props.token || "",
    password: "",
    passwordConfirm: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={styles.container}>
        <Mutation mutation={NEW_PASSWORD_MUTATION} variables={this.state}>
          {(newPassword, { error, data, loading }) => {
            return (
              <>
                {error ? <Message error={error} /> : null}
                {data ? (
                  <Message success="Password correctly changed!" />
                ) : null}
                <form
                  method="POST"
                  onSubmit={async e => {
                    e.preventDefault();
                    await newPassword();
                  }}
                  className={styles["form-container"]}
                >
                  <h1 className={styles["form-title"]}>New Password</h1>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      onChange={e => this.onChangeHandler(e)}
                      autoFocus
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="passwordConfirm">
                      Confirm Password
                    </InputLabel>
                    <Input
                      name="passwordConfirm"
                      type="password"
                      onChange={e => this.onChangeHandler(e)}
                      autoFocus
                      autoComplete="off"
                    />
                  </FormControl>
                  <div className={styles["button-container"]}>
                    <Button
                      disabled={loading}
                      className={styles.button}
                      type="submit"
                      color="primary"
                      variant="contained"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default PasswordReset;
