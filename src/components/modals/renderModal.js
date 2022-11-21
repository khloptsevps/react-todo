import React from 'react';

import AddTodoModal from './AddTodoModal.jsx';
import RemoveTodoModal from './RemoveTodoModal.jsx';
import ViewTodoModal from './ViewTodoModal.jsx';
import EditTodoModal from './EditTodoModal.jsx';

const renderModal = ({ type }) => {
  switch (type) {
    case 'addTodo':
      return <AddTodoModal />;
    case 'removeTodo':
      return <RemoveTodoModal />;
    case 'viewTodo':
      return <ViewTodoModal />;
    case 'editTodo':
      return <EditTodoModal />;

    default:
      return null;
  }
};

export default renderModal;
