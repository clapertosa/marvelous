import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Message from "../../Message/Message";
import styles from "../formStyle.scss";

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($email: String!) {
    resetPassword(email: $email)
  }
`;

class PasswordReset extends Component {
  state = {
    email: undefined
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={styles.container}>
        <Mutation mutation={RESET_PASSWORD_MUTATION} variables={this.state}>
          {(resetPassword, { error, data, loading }) => {
            return (
              <>
                {error ? <Message error={error} /> : null}
                {data ? (
                  <Message success="Password correctly changed, check your email" />
                ) : null}
                <form
                  method="POST"
                  onSubmit={async e => {
                    e.preventDefault();
                    await resetPassword();
                  }}
                  className={styles["form-container"]}
                >
                  <h1 className={styles["form-title"]}>Password reset</h1>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      name="email"
                      type="email"
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
