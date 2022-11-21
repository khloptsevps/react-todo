import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    todoReducer,
    modalReducer,
  },
});

export default store;
