import React, { useState } from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

function App() {
  const [state, setState] = useState(initialData);

  const onDragEndHandler = (result) => {
    //
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
