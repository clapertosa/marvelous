import { shallow } from "enzyme";
import NavbarDropdownItem from "../../components/Navbar/NavbarItems/NavbarDropdownItem/NavbarDropdownItem";

describe("NavbarDropdownItem", () => {
  it("should render component", () => {
    expect(shallow(<NavbarDropdownItem />).find("NavbarItem")).toBeTruthy;
  });
});
