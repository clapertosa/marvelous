import CommentInput from "./CommentInput/CommentInput";
import Comments from "./Comments/Comments";
import styles from "./CommentBox.scss";

const CommentBox = ({ categoryId, category }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      <div className={styles["grid-container"]}>
        <div className={styles["comment-input"]}>
          <CommentInput categoryId={categoryId} category={category} />
        </div>
        <div className={styles.comments}>
          <Comments categoryId={categoryId} category={category} />
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
