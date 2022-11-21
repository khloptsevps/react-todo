/* eslint-disable no-unused-vars */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import modalReducer from './slices/modalSlice';

const reducer = combineReducers({
  todosState: todoReducer,
  modalState: modalReducer,
});

const store = configureStore({
  reducer,
});

export default store;
