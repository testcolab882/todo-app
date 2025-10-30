import React from 'react';
import useTodoStore from '../stores/todoStore';
import { type Todo } from '../stores/todoStore';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleToggle = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div className={`flex items-center justify-between p-4 mb-2 rounded ${todo.completed ? 'bg-gray-200' : 'bg-white'}`}>
      <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.task}
      </span>
      <div className="flex items-center">
        <button onClick={handleToggle} className={`mr-2 px-2 py-1 rounded ${todo.completed ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'} text-white`}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
