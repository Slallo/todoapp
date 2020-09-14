import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToDo,
  value,
  completed,
  removeToDo,
  toggleToDoDoing,
  toggleToDoDone,
} from "./todo.slice";
import styles from "./todo.module.css";

export const ToDoList = () => {
  const todos = useSelector(value);
  const complete = useSelector(completed);
  const dispatch = useDispatch();
  const [textToAdd, setTextToAdd] = useState("");
  useEffect(() => {
    setTextToAdd("");
  }, [todos]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.action}>
        <input
          style={{ flex: "1", padding: "10px" }}
          id="action"
          value={textToAdd}
          onChange={(e) => setTextToAdd(e.target.value)}
          placeholder="Azione"
        />
        <button
          className={styles.addButton}
          onClick={() =>
            textToAdd !== ""
              ? dispatch(addToDo(textToAdd))
              : alert("Inserisci l'azione")
          }
        >
          +
        </button>
      </div>
      <div className={styles.todosContainer}>
        <div aria-label="todos-todo" className={styles.todosWrapper}>
          <h1>To Do</h1>
          {todos.map(
            (t: string, index) =>
              complete[index] === "todo" && (
                <div className={styles.todo} key={index}>
                  <p className={styles.text}>{t}</p>
                  <div className={styles.buttonrow}>
                    <button
                      className={styles.completeButton}
                      onClick={() => dispatch(toggleToDoDoing(index))}
                    >
                      In progress
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => dispatch(removeToDo(index))}
                    >
                      Cancella
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
        <div aria-label="todos-doing" className={styles.todosWrapper}>
          <h1>Doing</h1>
          {todos.map(
            (t: string, index) =>
              complete[index] === "doing" && (
                <div className={styles.doing} key={index}>
                  <p className={styles.text}>{t}</p>
                  <div className={styles.buttonrow}>
                    <button
                      className={styles.completeButton}
                      onClick={() => dispatch(toggleToDoDone(index))}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
        <div aria-label="todos-done" className={styles.todosWrapper}>
          <h1>Completed</h1>
          {todos.map(
            (t: string, index) =>
              complete[index] === "done" && (
                <div className={styles.completed} key={index}>
                  <p className={styles.text}>{t}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
