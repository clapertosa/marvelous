import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Toolbar from "../../components/Toolbar/Toolbar";
import styles from "./Layout.scss";

class Layout extends Component {
  render() {
    return (
      <div className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <Navbar />
          <Toolbar />
        </div>
        <div className={styles["main"]} />
        <div className={styles["footer"]} />
      </div>
    );
  }
}

export default Layout;
