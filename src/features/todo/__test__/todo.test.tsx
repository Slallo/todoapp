import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { ToDoList } from "../todo.component";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

const { getByText, getByPlaceholderText, getByRole, getByLabelText } = render(
  <Provider store={store}>
    <ToDoList />
  </Provider>
);

const testTodo = "Nuovo todo";

test("Todos works fine", async () => {
  // Set input text
  fireEvent.change(getByPlaceholderText("Azione"), {
    target: { value: testTodo },
  });

  // Check todo insert
  fireEvent.click(getByText("+"));
  const todos = store.getState().todo.value;
  expect(todos).toEqual(expect.arrayContaining([testTodo]));
  expect(getByLabelText("todos-todo")).toHaveTextContent(testTodo);

  // Check todo status change (doing)
  fireEvent.click(getByText("In progress"));
  const doing = store.getState().todo.completed;
  expect(doing).toEqual(expect.arrayContaining(["doing"]));
  expect(getByLabelText("todos-doing")).toHaveTextContent(testTodo);

  // Check todo status change (done)
  fireEvent.click(getByText("Done"));
  const completed = store.getState().todo.completed;
  expect(completed).toEqual(expect.arrayContaining(["done"]));
  expect(getByLabelText("todos-done")).toHaveTextContent(testTodo);
});
