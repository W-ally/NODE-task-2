// Models
const { User } = require('./user.model');
const { Post } = require('./task.model');
const { Comment } = require('./comment.model');

const initModels = () => {
	// 1 User <----> M Post
	User.hasMany(Post, { foreignKey: 'userId' });
	Post.belongsTo(User);

	
};

module.exports = { initModels };
