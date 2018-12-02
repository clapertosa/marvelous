import React, { Component } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Message from "../../Message/Message";
import styles from "../formStyle.scss";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    createUser(
      userInput: {
        name: $name
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      }
    ) {
      id
      name
      email
    }
  }
`;

class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={styles.container}>
        <Mutation mutation={CREATE_USER_MUTATION} variables={this.state}>
          {(createUser, { error, data, loading }) => {
            return (
              <>
                {data ? (
                  <Message
                    success={`You've been successfully registered! An email has been sent to ${
                      data.createUser.email
                    }`}
                  />
                ) : null}
                <Message error={error} />
                <form
                  method="POST"
                  onSubmit={async e => {
                    e.preventDefault();

                    const res = await createUser();
                  }}
                  className={styles["form-container"]}
                >
                  <h1 className={styles["form-title"]}>Sign Up</h1>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                      name="name"
                      type="text"
                      onChange={e => this.onChangeHandler(e)}
                      autoFocus
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      name="email"
                      type="email"
                      onChange={e => this.onChangeHandler(e)}
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
                  <FormControl fullWidth>
                    <InputLabel htmlFor="passwordConfirm">
                      Confirm Password
                    </InputLabel>
                    <Input
                      name="passwordConfirm"
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
                </form>
              </>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default RegisterForm;
