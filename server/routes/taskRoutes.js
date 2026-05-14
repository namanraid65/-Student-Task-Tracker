import express from 'express';
import {
  getTasks,
  getTaskStats,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// Get stats must be above /:id to prevent 'stats' being evaluated as an ID
router.route('/stats').get(getTaskStats);

router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

export default router;
