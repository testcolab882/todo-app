import { Request, Response } from 'express';
import pool from '../config/db';
import { CustomRequest } from '../middleware/authMiddleware';

export const getTodos = async (req: Request, res: Response) => {
  const user=(req as CustomRequest).user
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1', [user.id]);
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { task } = req.body;
  const user=(req as CustomRequest).user

  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
  }

  try {
    const newTodo = await pool.query(
      'INSERT INTO todos (user_id, task) VALUES ($1, $2) RETURNING *',
      [user.id, task]
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const user=(req as CustomRequest).user

  if (task === undefined && completed === undefined) {
    return res.status(400).json({ message: 'Task or completed status is required' });
  }

  try {
    const todoResult = await pool.query('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [id, user.id]);

    if (todoResult.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const currentTodo = todoResult.rows[0];
    const newTask = task !== undefined ? task : currentTodo.task;
    const newCompleted = completed !== undefined ? completed : currentTodo.completed;

    const updatedTodo = await pool.query(
      'UPDATE todos SET task = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [newTask, newCompleted, id, user.id]
    );

    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user=(req as CustomRequest).user
  try {
    const deleteResult = await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *', [id, user.id]);

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
