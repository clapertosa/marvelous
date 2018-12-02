import React, { Component } from "react";
import Router from "next/router";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Link from "next/link";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../../../hoc/User/User";
import Message from "../../Message/Message";
import styles from "../formStyle.scss";

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
    }
  }
`;

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={styles.container}>
        <Mutation
          mutation={LOGIN_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(login, { error, data, loading }) => {
            if (data) Router.push("/");
            return (
              <>
                {error ? <Message error={error} /> : null}
                <form
                  method="POST"
                  onSubmit={async e => {
                    e.preventDefault();
                    await login();
                  }}
                  className={styles["form-container"]}
                >
                  <h1 className={styles["form-title"]}>Sign In</h1>
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
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      onChange={e => this.onChangeHandler(e)}
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
                  <div className={styles["forgot-password"]}>
                    <Link href="/login/password-reset" prefetch>
                      <a>Forgot your password?</a>
                    </Link>
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

export default LoginForm;
