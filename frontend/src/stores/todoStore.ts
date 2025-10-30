import { create } from 'zustand';
import apiClient from '../api/axios';
import useLoadingStore from './loadingStore';
import toast from 'react-hot-toast';

export interface Todo {
  id: number;
  user_id: number;
  task: string;
  completed: boolean;
  created_at: Date;
}

interface TodoState {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (task: string) => Promise<void>;
  updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  fetchTodos: async () => {
    const { showLoading, hideLoading } = useLoadingStore.getState()
    try {
      showLoading()
      const response = await apiClient.get('/todos');
      set({ todos: response.data });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      hideLoading()
    }

  },
  addTodo: async (task) => {
    const { showLoading, hideLoading } = useLoadingStore.getState()
    try {
      showLoading()
      const response = await apiClient.post('/todos', { task });
      set((state) => ({ todos: [response.data, ...state.todos] }));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      hideLoading()
    }

  },
  updateTodo: async (id, updates) => {
    const { showLoading, hideLoading } = useLoadingStore.getState()
    try {
      showLoading()
      const response = await apiClient.put(`/todos/${id}`, updates);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data } : todo
        ),
      }));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      hideLoading()
    }



  },
  deleteTodo: async (id) => {
    const { showLoading, hideLoading } = useLoadingStore.getState()
    try {
      showLoading()
      await apiClient.delete(`/todos/${id}`);
      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      hideLoading()
    }



  },
}));

export default useTodoStore;
