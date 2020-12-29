import React from "react";
import styles from "./Column.module.css";
import Task from "./Task";
function Column({ column, tasks }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{column.title}</p>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
