import React, { Component } from "react";
import styles from "./NavbarDropdownItem.scss";
import NavbarItem from "../NavbarItem/NavbarItem";

class NavbarDropdownItem extends Component {
  state = {
    showDropdown: false
  };

  dropdownToggle = () => {
    this.setState(prevState => {
      return { showDropdown: !prevState.showDropdown };
    });
  };

  closeDropdown = () => {
    this.setState({ showDropdown: false });
  };

  render() {
    return (
      <div className={styles.container}>
        <div
          className={styles.title}
          onClick={this.dropdownToggle}
          onBlur={this.closeDropdown}
          tabIndex="0"
        >
          {this.props.children}
        </div>
        <div
          className={[
            styles.dropdown,
            this.state.showDropdown ? styles.open : styles.hide
          ].join(" ")}
        >
          {this.props.user ? (
            <ul className={styles["list-container"]}>
              <li
                className={styles["list-item"]}
                onMouseDown={e => e.preventDefault()}
              >
                <NavbarItem url="/dashboard">Dashboard</NavbarItem>
              </li>
              <li
                className={styles["list-item"]}
                onMouseDown={e => e.preventDefault()}
              >
                <NavbarItem url="/logout">Logout</NavbarItem>
              </li>
            </ul>
          ) : (
            <ul className={styles["list-container"]}>
              <li
                className={styles["list-item"]}
                onMouseDown={e => e.preventDefault()}
              >
                <NavbarItem url="/login">Sign In</NavbarItem>
              </li>
              <li
                className={styles["list-item"]}
                onMouseDown={e => e.preventDefault()}
              >
                <NavbarItem url="/register">Sign Up</NavbarItem>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default NavbarDropdownItem;
