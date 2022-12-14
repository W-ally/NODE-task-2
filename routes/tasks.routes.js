const express = require('express');

// Controllers
const {
	getAllTasks,
	getTasksStatus,
	createTask,
	updateTask,
	deleteTask,
} = require('../controllers/tasks.controller');

// Middlewares
const { tasksStatus,taskExists } = require('../middlewares/tasks.middlewares');
const {
	createTaskValidations,
} = require('../middlewares/validators.middlewares');

const tasksRouter = express.Router();

tasksRouter.post('/', createTaskValidations, createTask);

tasksRouter.get('/', getAllTasks);

tasksRouter.get('/:status',tasksStatus, getTasksStatus);


tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };
