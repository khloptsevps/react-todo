/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import dayjs from 'dayjs';

import db from '../../firebaseConfig.js';

import normalize from '../../utils/index.js';

const todosCollection = collection(db, 'todos');

export const fetchAllTodos = createAsyncThunk(
  'todoSlice/fetchAllTodos',
  async () => {
    const todosSnapshot = await getDocs(todosCollection);
    const todos = normalize(todosSnapshot);
    return todos;
  },
);

// Add todo function
export const addTodo = createAsyncThunk(
  'todoSlice/addTodo',
  // eslint-disable-next-line consistent-return
  async (formData) => {
    try {
      const docRef = await addDoc(todosCollection, formData);
      return { id: docRef.id, ...formData };
    } catch (error) {
      console.log(error);
    }
  },
);

export const editTodo = createAsyncThunk(
  'todoSlice/editTodo',
  async (formData) => {
    const todoRef = doc(db, 'todos', formData.id);
    await updateDoc(todoRef, formData);
    return formData;
  },
);

export const removeTodo = createAsyncThunk(
  'todoSlice/removeTodo',
  async (id) => {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
    return { id };
  },
);

export const setComplete = createAsyncThunk(
  'todoSlice/setComplete',
  async ({ id, complete }) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      complete,
    });
    return { id, complete };
  },
);

const initialState = {
  todos: [],
  loadingStatus: 'idle',
  error: null,
};

export const counterSlice = createSlice({
  name: 'TodoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        const loadingStatus = 'loading';
        const error = null;
        return { ...state, loadingStatus, error };
      })
      .addCase(fetchAllTodos.fulfilled, (state, { payload }) => {
        const loadingStatus = 'loaded';
        const error = null;
        return { ...state, todos: payload, loadingStatus, error };
      })
      .addCase(fetchAllTodos.rejected, (_state, action) => {
        const todos = [];
        const loadingStatus = 'failed';
        const { error } = action;
        return { todos, loadingStatus, error };
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        const { todos } = state;
        todos.unshift(payload);
      })
      .addCase(editTodo.fulfilled, (state, { payload }) => {
        const { todos } = state;
        const index = todos.findIndex(({ id }) => id === payload.id);
        todos[index] = { ...payload };
      })
      .addCase(removeTodo.fulfilled, (state, { payload }) => {
        const { todos } = state;
        const filtredTodos = todos.filter((todo) => todo.id !== payload.id);
        return { ...state, todos: filtredTodos };
      })
      .addCase(setComplete.fulfilled, (state, { payload }) => {
        const { todos } = state;
        const index = todos.findIndex(({ id }) => id === payload.id);
        todos[index].complete = payload.complete;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = counterSlice.actions;

export default counterSlice.reducer;
