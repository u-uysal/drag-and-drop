import React from "react";
import styles from "./Task.module.css";
import { Draggable } from "react-beautiful-dnd";

function Task({ task, index }) {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.container}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
