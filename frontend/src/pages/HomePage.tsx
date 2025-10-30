import React, { useEffect } from 'react';
import { Link } from 'react-router';
import useAuthStore from '../stores/authStore';
import useTodoStore from '../stores/todoStore';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { todos, fetchTodos } = useTodoStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated, fetchTodos]);

  return (
    <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Your Todos</h1>
          <AddTodoForm />
          <TodoList todos={todos} />
        </div>
    </div>
  );
};

export default HomePage;
