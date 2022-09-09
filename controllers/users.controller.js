// Models
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			where: { status: 'active' },
			include: [
				{
					model: Post,
					include: {
						model: Comment,
						include: { model: User },
					},
				},
				{
					model: Comment,
				},
			],
		});

		res.status(200).json({
			status: 'success',
			data: {
				users,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const newUser = await User.create({ name, email, password });

		// 201 -> Success and a resource has been created
		res.status(201).json({
			status: 'success',
			data: { newUser },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (req, res) => {
	try {
		const { name } = req.body;
		const { user } = req;

		// Method 1: Update by using the model
		// await User.update({ name }, { where: { id } });

		// Method 2: Update using a model's instance
		await user.update({ name });

		res.status(200).json({
			status: 'success',
			data: { user },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { user } = req;

		// Method 1: Delete by using the model
		// User.destroy({ where: { id } })

		// Method 2: Delete by using the model's instance
		// await user.destroy();

		// Method 3: Soft delete
		await user.update({ status: 'deleted' });

		res.status(204).json({ status: 'success' });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
};
