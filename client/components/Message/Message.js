import styles from "./Message.scss";

const Message = ({ success, error, dashboard }) => {
  return error && error.networkError ? (
    <div
      className={[
        !dashboard ? styles.container : styles["dashboard-container"],
        styles.error
      ].join(" ")}
    >
      <ul>
        {error.networkError.result.errors.map(errors => {
          return errors.data ? (
            errors.data.map(({ message }, index) => (
              <li key={index}>{message}</li>
            ))
          ) : (
            <li key={errors.message}>{errors.message}</li>
          );
        })}
      </ul>
    </div>
  ) : success ? (
    <div
      className={[
        !dashboard ? styles.container : styles["dashboard-container"],
        styles.success
      ].join(" ")}
    >
      <span>{success}</span>
    </div>
  ) : null;
};

export default Message;
