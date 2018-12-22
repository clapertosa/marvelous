import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import LoginForm, {
  LOGIN_MUTATION
} from "../../../components/Form/LoginForm/LoginForm";
import { CURRENT_USER_QUERY } from "../../../hoc/User/User";

const type = (wrapper, name, value) => {
  wrapper
    .find(`input[name="${name}"]`)
    .simulate("change", { target: { name, value } });
};

describe("LoginForm", () => {
  const mocks = [
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          email: "wolf@wolf.com",
          password: "password"
        }
      },
      result: {
        error: {
          message: "An error occurred"
        },
        data: {
          login: { __typename: "AuthData", userId: 1 }
        }
      }
    },
    {
      request: {
        query: CURRENT_USER_QUERY,
        variables: {}
      },
      result: {
        data: {
          currentUser: {
            __typename: "CurrentUser",
            userId: 1
          }
        }
      }
    }
  ];

  it("should show 'Submitting...' on submit button ", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <LoginForm />
      </MockedProvider>
    );
    type(wrapper, "email", "wolf@wolf.com");
    type(wrapper, "password", "password");
    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.contains("Submitting...")).toBe(true);
  });
});
