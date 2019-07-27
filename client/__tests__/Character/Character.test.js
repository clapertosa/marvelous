import { MockedProvider } from "react-apollo/test-utils";
import { mount } from "enzyme";
import { CURRENT_USER_QUERY } from "../../hoc/User/User";
import { COMMENTS_QUERY } from "../../components/CommentBox/Comments/Comments";
import {
  CHARACTER_QUERY,
  default as Character
} from "../../pages/character/index";

const mocks = [
  {
    request: {
      query: CHARACTER_QUERY,
      variables: { id: 27462 }
    },
    result: {
      data: {
        character: {
          __typename: "Character",
          id: 27462,
          name: "Dr. Strange",
          description: "Dr",
          thumbnail: {
            __typename: "Image",
            path: "/characterPoster",
            extension: "jpg"
          },
          comics: [
            {
              __typename: "Comic",
              id: 123,
              title: "The Dr. Strange",
              thumbnail: {
                __typename: "Image",
                path: "/comicCover",
                extension: "jpg"
              }
            }
          ]
        }
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
  },
  {
    request: {
      query: COMMENTS_QUERY,
      variables: { categoryId: 27462, category: "character" }
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
  }
];

describe("Character", () => {
  it("should give me Character data", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Character
          character={mocks[0].result.data.character}
          id={27462}
          category="character"
        />
      </MockedProvider>
    );

    wrapper.update();
    expect(wrapper.contains("Dr. Strange")).toBe(true);
  });
});
