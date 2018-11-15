import React, { Component } from "react";
import UserItem from "./UserItem/UserItem";
import styles from "./User.scss";

class User extends Component {
  state = {
    showDropdown: false
  };

  dropdownToggle = () => {
    this.setState(prevState => {
      return { showDropdown: !prevState.showDropdown };
    });
  };

  closeDropdownToggle = () => {
    this.setState({ showDropdown: false });
  };

  render() {
    return this.props.sideDrawer ? (
      <div className={styles.container}>
        <div className={styles["flex-container"]}>
          <div className={styles["signin-item"]}>
            <UserItem>Sign In</UserItem>
          </div>
          <div className={styles["signup-item"]}>
            <UserItem>Sign Up</UserItem>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.container}>
        <h3
          onClick={this.dropdownToggle}
          onBlur={this.closeDropdownToggle}
          tabIndex="0"
        >
          Sign In
        </h3>
        <div
          className={[
            styles.dropdown,
            this.state.showDropdown ? styles.display : styles.hide
          ].join(" ")}
        >
          <div className={styles["grid-container"]}>
            <div className={styles["signin-item"]}>
              <UserItem>Email</UserItem>
            </div>
            <div className={styles["signup-item"]}>
              <UserItem>Sign Up</UserItem>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
