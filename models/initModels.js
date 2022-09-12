// Models
const { User } = require('./user.model');
const { Task } = require('./task.model');

const initModels = () => {
	// 1 User <----> task
	User.hasMany(Task, { foreignKey: 'id' });
	Task.belongsTo(User);

	
};

module.exports = { initModels };
