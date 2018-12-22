import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Card from "../../components/Card/Card";

describe("Card", () => {
  it("renders", () => {
    expect(
      shallow(
        <Card
          image="/img/image"
          imageExtension="jpg"
          title="Beauty and the Beast"
        />
      )
    );
  });

  it("matches the snapshot", () => {
    const wrapper = shallow(
      <Card
        image="/img/image"
        imageExtension="jpg"
        title="Beauty and the Beast"
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ title: "Beauty and the Best" });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
