// backend/src/controllers/taskController.ts
import { Response } from 'express';
import Task from '../models/TaskModel';
import { AuthRequest } from '../middlewares/authMiddleware';

// @desc    Get user tasks
// @route   GET /api/tasks
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  // Database se sirf wahi tasks nikalenge jinki 'user' id current logged-in user ki id se match karti ho
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 }); 
  res.status(200).json(tasks);
};

// @desc    Create a task
// @route   POST /api/tasks
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.body.title) {
    res.status(400).json({ message: 'Please add a task title' });
    return;
  }

  // Naya task banate waqt, currently logged-in user ki id attach kar do
  const task = await Task.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(201).json(task);
};

// @desc    Update a task (toggle completion / edit text)
// @route   PUT /api/tasks/:id
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  // Security Check: Kya yeh task ushi user ka hai jo ise update karna chahta hai?
  if (task.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized to update this task' });
    return;
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // true ka matlab hai DB se update hone ke baad naya document wapas laao
  });

  res.status(200).json(updatedTask);
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  // Security Check: Kya yeh task ushi user ka hai jo ise delete karna chahta hai?
  if (task.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized to delete this task' });
    return;
  }

  await task.deleteOne();
  
  // Frontend ko sirf ID bhejte hain taaki wo UI se us ID wale task ko hata sake
  res.status(200).json({ id: req.params.id }); 
};
