import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { COMMENTS_QUERY } from "../Comments/Comments";
import User from "../../../hoc/User/User";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./CommentInput.scss";

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION(
    $body: String!
    $category: String!
    $categoryId: ID!
  ) {
    createComment(
      commentInput: {
        body: $body
        category: $category
        categoryId: $categoryId
      }
    ) {
      id
    }
  }
`;

class CommentInput extends Component {
  state = {
    characters: 140,
    body: ""
  };

  onInputChange = e => {
    const commentChars = e.target.value.trim().length;
    const charLeft = 140 - commentChars;
    this.setState({ characters: charLeft, body: e.target.value.trim() });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_COMMENT_MUTATION}
        variables={{
          categoryId: this.props.categoryId,
          category: this.props.category,
          body: this.state.body
        }}
        refetchQueries={[
          {
            query: COMMENTS_QUERY,
            variables: {
              categoryId: this.props.categoryId,
              category: this.props.category
            }
          }
        ]}
      >
        {(createComment, { data, error, loading }) => {
          return (
            <User>
              {({ data: { currentUser }, error, loadingUser }) => {
                return (
                  <div className={styles["grid-container"]}>
                    <div className={styles.textarea}>
                      <textarea
                        id="comment"
                        title={
                          !currentUser
                            ? "Sign-in to post a comment!"
                            : null || (currentUser && !currentUser.activated)
                            ? "Activate you account"
                            : null
                        }
                        disabled={
                          !currentUser ||
                          (currentUser && !currentUser.activated) ||
                          loading
                        }
                        onChange={e => this.onInputChange(e)}
                        maxLength={140}
                      />
                    </div>
                    <div className={styles["validation-button"]}>
                      <span>
                        {loading ? (
                          <Spinner />
                        ) : (
                          this.state.characters + " characters left"
                        )}
                      </span>
                      <button
                        title={
                          !currentUser
                            ? "Sign-in to post a comment!"
                            : null || (currentUser && !currentUser.activated)
                            ? "Activate you account"
                            : null || this.state.body.length <= 0
                            ? "Write something in the textbox!"
                            : null
                        }
                        onClick={async e => {
                          e.preventDefault();
                          await createComment();
                          this.setState({ body: "", characters: 140 });
                          !loading
                            ? (document.getElementById("comment").value = "")
                            : null;
                        }}
                        type="submit"
                        disabled={
                          this.state.body.length <= 0 ||
                          !currentUser ||
                          loadingUser ||
                          loading
                        }
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                );
              }}
            </User>
          );
        }}
      </Mutation>
    );
  }
}

export default CommentInput;
