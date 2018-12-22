import { MockedProvider } from "react-apollo/test-utils";
import { mount } from "enzyme";
import { CURRENT_USER_QUERY, User } from "../../../hoc/User/User";
import Comments, {
  COMMENTS_QUERY
} from "../../../components/CommentBox/Comments/Comments";

const mocks = [
  {
    request: {
      query: COMMENTS_QUERY,
      variables: { categoryId: 1, category: "character" }
    },
    result: {
      data: {
        comments: [
          {
            __typename: "Comment",
            id: 123,
            user: {
              __typename: "CommentUser",
              id: 1,
              name: "Wolf",
              avatar: null
            },
            body: "This character tho!",
            created_at: new Date(Date.now()),
            updated_at: new Date(Date.now())
          }
        ]
      }
    }
  },
  {
    request: {
      query: CURRENT_USER_QUERY,
      variables: {}
    },
    result: {
      errors: [
        {
          message: "User not found"
        }
      ],
      data: {
        currentUser: {
          __typename: "CurrentUser",
          userId: 1,
          name: "Wolf",
          email: "wolf@wolf.com",
          avatar: null,
          activated: true
        }
      }
    }
  }
];

describe("Comments", () => {
  it("should give me Comments data", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Comments categoryId={1} category="character" />
      </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();

    expect(wrapper.find("h2").text()).toEqual("What are others saying...");
    expect(wrapper.contains("This character tho!")).toBe(true);
  });
});
