import React from "react";
import styles from "./Column.module.css";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
function Column({ column, tasks }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{column.title}</p>
      <Droppable droppableId={column.id} key={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.taskList}
          >
            {tasks.map((task, i) => (
              <Task key={task.id} task={task} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
