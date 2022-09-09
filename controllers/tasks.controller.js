// Models
const {Task } = require('../models/task.model');
const { User } = require('../models/user.model');


const getAllTasks = async (req, res) => {
	try {
		const posts = await Task.findAll({
			where: { status: 'active' },
			attributes: ['id', 'title', 'content', 'createdAt'],
			include: [
				{ model: User, attributes: ['id', 'name'] },
				{
					model: Comment,
					attributes: ['id', 'comment', 'createdAt'],
				},
			],
		});

		res.status(200).json({
			status: 'success',
			data: {
				posts,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const getTasksStatus = async (req, res) => {
	try {
		 const{status}= req;

		const posts = await Task.findAll({
			where: { status },
			/*attributes: ['id', 'title', 'content', 'createdAt'],
			include: [
				{ model: User, attributes: ['id', 'name'] },
				{
					model: Comment,
					attributes: ['id', 'comment', 'createdAt'],
				},
			],*/
		});

		res.status(200).json({
			status: 'success',
			data: {
				posts,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createTask = async (req, res) => {
	try {
		const { title, userId, startDate, limitDate } = req.body;

		const newTask = await Post.create({ title, userId, startDate, limitDate });

		res.status(201).json({
			status: 'success',
			data: { newTask },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateTask = async (req, res) => {
	try {
		const { finishDate } = req.body;
		const { task } = req;

        //get DATE VALUE
		const dateLimit = new Date(task.limitDate).getTime();
		const dateFinish = new Date(finishDate).getTime();
	  
		const residualTime = limitDate - finishDate;
	  
		if (residualTime > 0) {
		  await task.update({ finishDate, status: 'completed' });
		} else if (residualTime < 0) {
		  await task.update({ finishDate, status: 'late' });
		}

		await task.update({ finishDate });

		res.status(200).json({
			status: 'success',
			data: {task },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteTask = async (req, res) => {
	try {
		const { task } = req;

		await task.update({ status: 'cancelled' });

		res.status(200).json({
			status: 'success',
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllTasks,
	getTasksStatus,
	createTask,
	updateTask,
	deleteTask,
};
