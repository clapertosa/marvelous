import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Comment from "./Comment/Comment";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./Comments.scss";

const COMMENTS_QUERY = gql`
  query COMMENTS_QUERY($categoryId: ID!, $category: String!) {
    comments(categoryId: $categoryId, category: $category) {
      id
      user {
        id
        name
        avatar
      }
      body
      created_at
      updated_at
    }
  }
`;

class Comments extends Component {
  render() {
    return (
      <div className={styles["grid-container"]}>
        <div className={styles.title}>
          <h2>What are others saying...</h2>
          <hr />
        </div>
        <div id="comments" className={styles.comments}>
          <Query
            query={COMMENTS_QUERY}
            variables={{
              categoryId: this.props.categoryId,
              category: this.props.category
            }}
          >
            {({ data: { comments }, error, loading }) => {
              if (!comments) return null;
              if (loading) return <Spinner />;
              return (
                <>
                  {comments.map(comment => (
                    <Comment
                      key={comment.id}
                      id={comment.id}
                      user={comment.user}
                      categoryId={this.props.categoryId}
                      category={this.props.category}
                      body={comment.body}
                      createdAt={comment.created_at}
                      updatedAt={comment.updated_at}
                    />
                  ))}
                </>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export { COMMENTS_QUERY };
export default Comments;
