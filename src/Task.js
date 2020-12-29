import React from "react";
import styles from "./Task.module.css";

function Task({ task }) {
  return <div className={styles.container}>{task.content}</div>;
}

export default Task;
