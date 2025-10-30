import React, { useState } from 'react';
import useTodoStore from '../stores/todoStore';

const AddTodoForm: React.FC = () => {
  const [task, setTask] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      await addTodo(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow px-3 py-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
