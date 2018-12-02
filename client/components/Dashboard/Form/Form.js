import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../../../hoc/User/User";
import {
  CHANGE_NAME_MUTATION,
  CHANGE_EMAIL_MUTATION,
  CHANGE_PASSWORD_MUTATION
} from "./mutations";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Message from "../../Message/Message";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./Form.scss";

class ChangeForm extends Component {
  state = {
    showInput: false,
    name: this.props.initialName,
    email: this.props.initialEmail,
    emailConfirm: undefined,
    oldPassword: undefined,
    password: undefined,
    passwordConfirm: undefined
  };

  toggleHandler = () => {
    this.setState(prevState => {
      return { showInput: !prevState.showInput };
    });
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState({ buttonDisabled: false });
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header} onClick={this.toggleHandler}>
          <div className={styles.title}>
            Change{" "}
            {this.props.name
              ? "Name"
              : this.props.email
              ? "Email"
              : this.props.password
              ? "Password"
              : null}
          </div>
          <div className={styles.toggle}>
            {this.state.showInput ? (
              <i className="icon-up-open" />
            ) : (
              <i className="icon-down-open" />
            )}
          </div>
        </div>

        <div
          className={[
            styles["form-input"],
            this.state.showInput ? styles.open : styles.hide
          ].join(" ")}
        >
          {this.props.name ? (
            <Mutation
              variables={{ name: this.state.name }}
              mutation={CHANGE_NAME_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(changeName, { error, data, loading }) => {
                return (
                  <form
                    method="POST"
                    onSubmit={async e => {
                      e.preventDefault();
                      await changeName();
                      this.setState({ buttonDisabled: true });
                    }}
                  >
                    {error ? <Message dashboard error={error} /> : null}
                    <FormControl>
                      <InputLabel htmlFor="name">Name</InputLabel>
                      <Input
                        onChange={e => this.onChangeHandler(e)}
                        type="text"
                        name="name"
                        value={this.state.name}
                        error={error !== undefined}
                      />
                    </FormControl>
                    <div className={styles.button}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? <Spinner spinnerHeight="36px" /> : "Save"}
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Mutation>
          ) : null}
          {this.props.email ? (
            <Mutation
              mutation={CHANGE_EMAIL_MUTATION}
              variables={{
                email: this.state.email,
                emailConfirm: this.state.emailConfirm
              }}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(changeEmail, { error, data, loading }) => (
                <form
                  method="POST"
                  onSubmit={async e => {
                    e.preventDefault();
                    await changeEmail();
                    this.setState({ buttonDisabled: true });
                  }}
                >
                  {error ? <Message dashboard error={error} /> : null}
                  <FormControl>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      onChange={e => this.onChangeHandler(e)}
                      required
                      type="email"
                      name="email"
                      value={this.state.email}
                    />
                  </FormControl>
                  <br />
                  <FormControl>
                    <InputLabel htmlFor="emailConfirm">
                      Confirm Email
                    </InputLabel>
                    <Input
                      onChange={e => this.onChangeHandler(e)}
                      required
                      type="email"
                      name="emailConfirm"
                    />
                  </FormControl>
                  <div className={styles.button}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? <Spinner spinnerHeight="36px" /> : "Save"}
                    </Button>
                  </div>
                </form>
              )}
            </Mutation>
          ) : null}
          {this.props.password ? (
            <Mutation
              mutation={CHANGE_PASSWORD_MUTATION}
              variables={{
                oldPassword: this.state.oldPassword,
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm
              }}
            >
              {(changePassword, { error, data, loading }) => (
                <form
                  method="POST"
                  onSubmit={async e => {
                    e.preventDefault();
                    await changePassword();
                    this.setState({ buttonDisabled: true });
                  }}
                >
                  {error ? <Message dashboard error={error} /> : null}
                  <FormControl>
                    <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
                    <Input
                      onChange={e => this.onChangeHandler(e)}
                      required
                      type="password"
                      name="oldPassword"
                    />
                  </FormControl>
                  <br />
                  <FormControl>
                    <InputLabel htmlFor="password">New Password</InputLabel>
                    <Input
                      onChange={e => this.onChangeHandler(e)}
                      required
                      type="password"
                      name="password"
                    />
                  </FormControl>
                  <br />
                  <FormControl>
                    <InputLabel htmlFor="passwordConfirm">
                      Confirm Password
                    </InputLabel>
                    <Input
                      onChange={e => this.onChangeHandler(e)}
                      required
                      type="password"
                      name="passwordConfirm"
                    />
                  </FormControl>
                  <div className={styles.button}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? <Spinner spinnerHeight="36px" /> : "Save"}
                    </Button>
                  </div>
                </form>
              )}
            </Mutation>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ChangeForm;
