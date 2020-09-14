import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ToDoState {
  value: string[];
  id: number;
  completed: string[];
  status: "todo" | "doing" | "done";
}

const initialState: ToDoState = {
  value: [],
  id: 0,
  completed: [],
  status: "todo",
};

export const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<string>) => {
      state.value[state.id] = action.payload;
      state.completed[state.id] = "todo";
      state.id++;
    },
    removeToDo: (state, action: PayloadAction<number>) => {
      let deleted = state.value.splice(action.payload, 1);
      state.value = state.value.filter(
        (value) => value !== deleted[action.payload]
      );
      state.id = state.value.length;
      state.completed.splice(action.payload, 1);
    },
    toggleToDoDoing: (state, action: PayloadAction<number>) => {
      state.completed[action.payload] = "doing";
    },
    toggleToDoDone: (state, action: PayloadAction<number>) => {
      state.completed[action.payload] = "done";
    },
  },
});

export const {
  addToDo,
  removeToDo,
  toggleToDoDoing,
  toggleToDoDone,
} = toDoSlice.actions;

export const value = (state: RootState) => state.todo.value;
export const completed = (state: RootState) => state.todo.completed;

export default toDoSlice.reducer;
