import React, { useState } from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import Column from "./Column";

function App() {
  const [state, setState] = useState(initialData);
  return state.columnOrder.map((item) => {
    //sıraya bağlı tüm columnlar
    const column = state.columns[item];
    //column' bağlı tasklar
    const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

    return <Column key={column.id} column={column} tasks={tasks} />;
  });
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
