import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

export const addTodo = createAsyncThunk("todo/addTodo", async (newTodo) => {
  try {
    const response = await axios.post("http://localhost:3000/todos", newTodo);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  try {
    const response = await axios.get("http://localhost:3000/todos");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (todoId) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${todoId}`);
    return todoId;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const toggleTodo = createAsyncThunk("todo/toggleTodo", async ({ id, completed }) => {
  try {
    const response = await axios.patch(`http://localhost:3000/todos/${id}`, { completed: !completed });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.todos = [];
        state.error = "";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = "";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
        state.error = "";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        state.error = "";
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
        );
        state.error = "";
      });
  },
});

export const { reducer: todoReducer, actions: todoActions } = todoSlice;
