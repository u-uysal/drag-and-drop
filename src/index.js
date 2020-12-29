import React, { useState } from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

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

    //kaynak columu bulma
    const column = state.columns[source.droppableId];

    //column'da bulunan tüm task Idleri
    const newTaskIds = Array.from(column.taskIds);

    //hangi task'ınyerin değişirse onu kaynak columdan silerek hedef columa ekleme
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    console.log(newTaskIds);

    //taskları yeni haliyle tekrar yazma
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    console.log(newColumn);

    //taskları şekillenmiş columu update etme
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      {state.columnOrder.map((item) => {
        //sıraya bağlı tüm columnlar
        const column = state.columns[item];
        //column' bağlı tasklar
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
