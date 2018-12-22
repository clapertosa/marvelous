import { shallow } from "enzyme";
import Avatar from "../../components/Avatar/Avatar";

describe("Avatar", () => {
  const fakeAvatar = {
    avatar: "/img/avatar.jpg"
  };
  it("should correctly pass an image in props", () => {
    const wrapper = shallow(<Avatar avatar={fakeAvatar.avatar} />);
    expect(wrapper.find("img").props().src).toEqual(fakeAvatar.avatar);
  });

  it("should load a default avatar if none is provided", () => {
    expect(
      shallow(<Avatar />)
        .find("img")
        .props().src
    ).toEqual("/static/images/defaultAvatar.png");
  });
});
