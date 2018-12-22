import { shallow } from "enzyme";
import { toJson } from "enzyme-to-json";
import Banner from "../../components/Banner/Banner";

describe("Banner", () => {
  it("should correctly display backgrounds", () => {
    const wrapper = shallow(<Banner />);
    expect(wrapper.find("img")).toHaveLength(4);
    const srcs = wrapper.find("img").map(node => node.props().src);
    expect(srcs).toEqual([
      "/static/backgrounds/banner0.jpg",
      "/static/backgrounds/banner1.jpg",
      "/static/backgrounds/banner2.jpg",
      "/static/backgrounds/banner3.jpg"
    ]);
  });

  it("should match the snapshot", () => {
    const wrapper = shallow(<Banner />);
    expect(wrapper.toJson).toMatchSnapshot();
  });
});
