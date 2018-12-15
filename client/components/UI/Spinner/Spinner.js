import React from "react";
import styles from "./Spinner.scss";

const Spinner = ({
  containerWidth,
  containerHeight,
  spinnerWidth,
  spinnerHeight,
  centered
}) => {
  return (
    <div
      className={[styles.container, centered ? styles.centered : null].join(
        " "
      )}
      style={{
        minWidth: containerWidth || "auto",
        minHeight: containerHeight || "auto"
      }}
    >
      <img
        id={styles["spinner-image"]}
        width={spinnerWidth || "60px"}
        height={spinnerHeight || "60px"}
        src="/static/images/spinner.svg"
      />
    </div>
  );
};

export default Spinner;
