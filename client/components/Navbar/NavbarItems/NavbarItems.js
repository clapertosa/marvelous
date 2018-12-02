import User from "../../../hoc/User/User";
import NavbarDropdownItem from "./NavbarDropdownItem/NavbarDropdownItem";
import Logo from "../Logo/Logo";
import Avatar from "../../Avatar/Avatar";
import Search from "../Search/Search";

const NavbarItems = props => {
  return (
    <>
      <User>
        {({ data: { currentUser } }) => {
          if (currentUser)
            return (
              <NavbarDropdownItem user={currentUser}>
                <Avatar avatar={currentUser.avatar} navbar />
              </NavbarDropdownItem>
            );
          return <NavbarDropdownItem>Sign In</NavbarDropdownItem>;
        }}
      </User>
      {props.sideDrawer ? null : <Logo />}
      {props.sideDrawer ? null : <Search sideDrawer={props.sideDrawer} />}
    </>
  );
};

export default NavbarItems;
