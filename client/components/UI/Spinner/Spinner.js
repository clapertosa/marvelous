import React from "react";
import styles from "./Spinner.scss";

const Spinner = ({
  containerWidth,
  containerHeight,
  spinnerWidth,
  spinnerHeight
}) => {
  return (
    <div
      className={styles.container}
      style={{
        minWidth: containerWidth || "auto",
        minHeight: containerHeight || "auto"
      }}
    >
      <img
        width={spinnerWidth || "60px"}
        height={spinnerHeight || "60px"}
        src="/static/images/spinner.svg"
      />
    </div>
  );
};

export default Spinner;
