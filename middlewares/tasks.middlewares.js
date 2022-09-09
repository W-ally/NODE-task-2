// Models
const req = require('express/lib/request');
const { Task } = require('../models/task.model');

const taskExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const task = await Task.findOne({ where: { id,status: 'active'} });

		if (!task) {
			return res.status(404).json({
				status: 'error',
				message: 'Task not found.Provide ID registered ',
			});
		}

		req.task = task;
		next();
	} catch (error) {
		console.log(error);
	}
};

const tasksStatus = () =>{
	try {
		const { status } = req.params;

        const validStatus = ['active', 'completed', 'late', 'cancelled'];

        const ifValid = validStatus.find(e => e === status);

  		if (!ifValid) {
   		 return next(
       	new AppError(
        'Status must be either active, completed, late or cancelled',
        400
      )
    );
  }
     req.status = status;
	} catch (error) {
			console.log(error)
		}
	}

module.exports = { taskExists, tasksStatus };
