import NavbarItem from "../../components/Navbar/NavbarItems/NavbarItem/NavbarItem";
import { shallow } from "enzyme";

describe("NavbarItem", () => {
  it("correctly shows url and children", () => {
    const wrapper = shallow(<NavbarItem url="/home">Home</NavbarItem>);
    expect(wrapper.dive().text()).toEqual("Home");
    expect(wrapper.props().href).toEqual("/home");
  });
});
