import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';

import db, { storage } from '../../firebaseConfig.js';

import normalize from '../../utils/index.js';

const todosCollection = collection(db, 'todos');

export const fetchAllTodos = createAsyncThunk(
  'todoSlice/fetchAllTodos',
  async () => {
    const listFilesRef = ref(storage, 'files');
    const listFiles = await listAll(listFilesRef);
    const normalizeList = listFiles.items.map(async (reference) => {
      const link = await getDownloadURL(reference);
      const { name } = reference;
      return { name, link };
    });
    const filesData = await Promise.all(normalizeList);
    const todosSnapshot = await getDocs(todosCollection);
    const todos = normalize(todosSnapshot, filesData);
    return todos;
  },
);

export const addTodo = createAsyncThunk(
  'todoSlice/addTodo',
  async ({ files, ...formData }) => {
    const promiseLinks = files.map(async ({ name, file }) => {
      const fileRef = ref(storage, `files/${name}`);
      await uploadBytes(fileRef, file);
      const link = await getDownloadURL(fileRef);
      return { name, link };
    });

    const data = await Promise.all(promiseLinks);

    const links = data.map(({ link }) => link);
    const docRef = await addDoc(todosCollection, {
      ...formData,
      files: links,
    });
    return { id: docRef.id, ...formData, files: data };
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
  async ({ id, files }) => {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
    if (!files.length) {
      return { id };
    }
    files.forEach(({ name }) => {
      const fileRef = ref(storage, `files/${name}`);
      deleteObject(fileRef);
    });
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
};

export const counterSlice = createSlice({
  name: 'TodoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        const loadingStatus = 'loading';
        return { ...state, loadingStatus };
      })
      .addCase(fetchAllTodos.fulfilled, (state, { payload }) => {
        const loadingStatus = 'loaded';
        return { ...state, todos: payload, loadingStatus };
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
