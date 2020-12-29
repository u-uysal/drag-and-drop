import React, { useState } from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import styles from "./Index.module.css";

function App() {
  const [state, setState] = useState(initialData);

  const onDragEndHandler = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    // hedef yoksa oldugun yere geri dön
    if (!destination) {
      return;
    }

    //task aynı yere tekrar konduysa bir şey yapma
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId]; // başlangıc
    console.log(start);
    const finish = state.columns[destination.droppableId]; // hedef
    console.log(finish);

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...finish,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className={styles.container}>
        {state.columnOrder.map((item) => {
          //sıraya bağlı tüm columnlar
          const column = state.columns[item];
          //column' bağlı tasklar
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
