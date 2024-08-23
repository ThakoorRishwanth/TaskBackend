const Task = require('../models/Task');
const User = require('../models/User'); 

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;

    if (!title || !description || !priority || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate the assignedTo field if present
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(400).json({ message: 'Assigned user does not exist' });
      }
    }

    const task = new Task({ title, description, priority, status, assignedTo });
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks with filtering options
const getTasks = async (req, res) => {
  try {
    const { priority, status, assignedTo } = req.query;

    const query = {};
    if (priority) query.priority = priority;
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name')
      .sort({ priority: -1 });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Validate the assignedTo field if present
    if (req.body.assignedTo) {
      const user = await User.findById(req.body.assignedTo);
      if (!user) {
        return res.status(400).json({ message: 'Assigned user does not exist' });
      }
    }

    Object.assign(task, req.body);
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
