import React from "react";
import { ToDoList } from "./features/todo/todo.component";
import "./app.css";

function App() {
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <ToDoList />
    </div>
  );
}

export default App;
