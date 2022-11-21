import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    todosState: todoReducer,
    modalState: modalReducer,
  },
});

export default store;
