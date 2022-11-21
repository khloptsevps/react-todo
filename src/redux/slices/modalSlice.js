/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

import { addTodo, removeTodo, editTodo } from './todoSlice';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => ({ ...state, ...payload }),
    closeModal: (state, _action) => {
      const isOpened = false;
      return { ...state, isOpened };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state) => ({
        ...state,
        isOpened: false,
      }))
      .addCase(removeTodo.fulfilled, (state) => ({
        ...state,
        isOpened: false,
      }))
      .addCase(editTodo.fulfilled, (state) => ({
        ...state,
        isOpened: false,
      }));
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
