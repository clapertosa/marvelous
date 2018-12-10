import React, { Component } from "react";
import Router from "next/router";
import DrawerToggle from "./SideDrawer/DrawerToggle/DrawerToggle";
import NavbarItems from "./NavbarItems/NavbarItems";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";
import styles from "./Navbar.scss";
import Logo from "./Logo/Logo";
import Search from "./Search/Search";

class Navbar extends Component {
  componentDidMount() {
    this.setState({ currentRoute: Router.route });
  }

  componentDidUpdate() {
    if (this.state.currentRoute !== Router.route) {
      this.closeSideDrawer();
      this.setState({ currentRoute: Router.route });
    }
  }

  state = {
    showSideDrawer: false,
    currentRoute: undefined
  };

  showSideDrawerToggle = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <header className={styles.header}>
        <nav className={[styles.nav, styles.desktop].join(" ")}>
          <NavbarItems />
        </nav>
        <nav className={[styles.nav, styles.mobile].join(" ")}>
          <DrawerToggle clicked={this.showSideDrawerToggle} />
          <Logo small />
          <Search />
        </nav>
        <SideDrawer
          show={this.state.showSideDrawer}
          closeSideDrawer={this.closeSideDrawer}
        />
        <Backdrop
          show={this.state.showSideDrawer}
          closeSideDrawer={this.closeSideDrawer}
        />
      </header>
    );
  }
}

export default Navbar;
