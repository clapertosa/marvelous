import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Toolbar from "../../components/Toolbar/Toolbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Layout.scss";

class Layout extends Component {
  render() {
    return (
      <div className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <Navbar />
          <Toolbar />
        </div>
        <div className={styles["main"]}>{this.props.children}</div>
        <div className={styles["footer"]}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;
