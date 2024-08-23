
const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Only admins can create, update, and delete tasks
router.post('/', authMiddleware, roleMiddleware(['admin']), createTask);
router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTaskById);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateTask);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteTask);

module.exports = router;
