import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import { COMMENTS_QUERY } from "../Comments";
import User from "../../../../hoc/User/User";
import styles from "./Comment.scss";
import Spinner from "../../../UI/Spinner/Spinner";

const EDIT_COMMENT_MUTATION = gql`
  mutation EDIT_COMMENT_MUTATION(
    $id: ID!
    $userId: ID!
    $categoryId: ID!
    $category: String!
    $body: String!
  ) {
    editComment(
      id: $id
      userId: $userId
      categoryId: $categoryId
      category: $category
      body: $body
    ) {
      id
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION(
    $id: ID!
    $userId: ID!
    $categoryId: ID!
    $category: String!
    $body: String!
  ) {
    deleteComment(
      id: $id
      userId: $userId
      categoryId: $categoryId
      category: $category
      body: $body
    )
  }
`;

class Comment extends Component {
  state = {
    editable: false,
    initialText: this.props.body,
    text: this.props.body,
    loading: false
  };

  editOn = () => {
    this.setState(prevState => {
      return { editable: !prevState.editable };
    });
  };

  editOff = () => {
    this.setState(prevState => {
      return { editable: false, text: prevState.initialText };
    });
  };

  editComment = async (client, userId) => {
    this.setState({ loading: true });
    const res = await client.mutate({
      mutation: EDIT_COMMENT_MUTATION,
      variables: {
        id: this.props.id,
        userId,
        categoryId: this.props.categoryId,
        category: this.props.category,
        body: this.state.text
      },
      refetchQueries: [
        {
          query: COMMENTS_QUERY,
          variables: {
            categoryId: this.props.categoryId,
            category: this.props.category
          }
        }
      ]
    });

    this.setState(prevState => {
      return { initialText: prevState.text, editable: false, loading: false };
    });
  };

  deleteComment = async (client, userId) => {
    const deleteConfirmed = confirm(
      "Do you really want to delete your comment?"
    );

    if (!deleteConfirmed) {
      return;
    }

    this.setState({ loading: true });
    const res = await client.mutate({
      mutation: DELETE_COMMENT_MUTATION,
      variables: {
        id: this.props.id,
        userId,
        categoryId: this.props.categoryId,
        category: this.props.category,
        body: this.state.text
      },
      refetchQueries: [
        {
          query: COMMENTS_QUERY,
          variables: {
            categoryId: this.props.categoryId,
            category: this.props.category
          }
        }
      ]
    });

    this.setState({ loading: false });
  };

  onInputChange = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div className={styles["grid-container"]}>
        <div className={styles.avatar}>
          <img
            src={this.props.user.avatar || "/static/images/defaultAvatar.png"}
            alt={`${this.props.user.name}'s avatar`}
          />
        </div>
        <div className={styles.comment}>
          <div
            className={styles["comment-data"]}
            style={{ display: this.state.editable ? "none" : "block" }}
          >
            {this.state.text}
          </div>
          <User>
            {({ data: { currentUser }, error, loading }) => {
              if (currentUser.userId === this.props.user.id)
                return (
                  <>
                    <textarea
                      readOnly={!this.state.editable}
                      className={styles["comment-data"]}
                      maxLength={140}
                      style={{
                        display: this.state.editable ? "block" : "none"
                      }}
                      onChange={e => this.onInputChange(e)}
                      value={this.state.text}
                    />
                    <div className={styles.edit}>
                      <ApolloConsumer>
                        {client =>
                          !this.state.editable ? (
                            <>
                              <i
                                onClick={this.editOn}
                                className="icon-pencil"
                              />
                              <i
                                onClick={() => {
                                  this.deleteComment(
                                    client,
                                    currentUser.userId
                                  );
                                }}
                                className="icon-trash-empty"
                              />
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  this.editComment(client, currentUser.userId);
                                }}
                              >
                                Edit
                              </button>
                              <button onClick={this.editOff}>Cancel</button>
                            </>
                          )
                        }
                      </ApolloConsumer>
                    </div>
                  </>
                );
              return <div />;
            }}
          </User>
          <div className={styles.author}>
            {!this.state.loading ? (
              <div>
                by <b>{this.props.user.name}</b>{" "}
                <span title={moment(this.props.createdAt).format("LLLL")}>
                  {this.props.updatedAt > this.props.createdAt
                    ? `edited ${moment(this.props.updatedAt).fromNow()}`
                    : moment(this.props.createdAt).fromNow()}
                </span>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
