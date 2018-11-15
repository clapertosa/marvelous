import User from "../User/User";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";

const NavbarItems = props => {
  return (
    <>
      <User sideDrawer={props.sideDrawer} />
      {props.sideDrawer ? null : <Logo />}
      {props.sideDrawer ? null : <Search sideDrawer={props.sideDrawer} />}
    </>
  );
};

export default NavbarItems;
