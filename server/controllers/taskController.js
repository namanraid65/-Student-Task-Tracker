import Task from '../models/Task.js';
import mongoose from 'mongoose';

// @desc    Get all tasks with optional search and filters
// @route   GET /api/tasks
export const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
export const getTaskStats = async (req, res, next) => {
  try {
    const total = await Task.countDocuments();
    const pending = await Task.countDocuments({ status: 'Pending' });
    const completed = await Task.countDocuments({ status: 'Completed' });

    // Calculate overdue (dueDate < today AND status != 'Completed')
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison

    const overdue = await Task.countDocuments({
      dueDate: { $lt: today },
      status: { $ne: 'Completed' }
    });

    res.status(200).json({
      total,
      pending,
      completed,
      overdue,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    // Basic backend validation
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ message: 'Title must be at least 3 characters' });
    }
    if (!description || description.trim().length < 5) {
      return res.status(400).json({ message: 'Description must be at least 5 characters' });
    }
    if (!dueDate || isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ message: 'Invalid due date' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      status: status || 'Pending',
      priority: priority || 'Medium',
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task removed successfully' });
  } catch (error) {
    next(error);
  }
};
