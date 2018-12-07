import React, { Component } from "react";
import DrawerToggle from "./SideDrawer/DrawerToggle/DrawerToggle";
import NavbarItems from "./NavbarItems/NavbarItems";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";
import styles from "./Navbar.scss";
import Logo from "./Logo/Logo";
import Search from "./Search/Search";

class Navbar extends Component {
  state = {
    showSideDrawer: false
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
        <SideDrawer show={this.state.showSideDrawer} />
        <Backdrop
          show={this.state.showSideDrawer}
          clicked={this.closeSideDrawer}
        />
      </header>
    );
  }
}

export default Navbar;
