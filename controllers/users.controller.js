// Models
const { User } = require('../models/user.model');



const getAllUsers = async (req, res) => {
  try {
	
	const users = await User.findAll({
		attributes: { exclude: ['password'] },
	  });
	
	  res.status(200).json({
		users,
	  });
  } catch (error) {
	console.log(error);
}
		
};

const createUser = async (req, res ) => {

	try {
	const { name, email, password } = req.body;

    const newUser = await User.create({
    name,
    email,
    password,
    
  });
  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({ newUser });
		
	} catch (error) {
		console.log(error)
	}
  
};

const getUserById = async (req, res) => {

	try {
		const { user } = req;

		res.status(200).json({
		  user,
		});
	} catch (error) {
		console.log(error)
		
	}
 
};

const updateUser = async (req, res) => {
try {
	const { user } = req;
  const { name } = req.body;

  await user.update({ name });

  res.status(200).json({ status: 'success' });
} catch (error) {
	console.log(error)
}
  
};

const deleteUser = async (req, res, next) => {
try {
	const { user } = req;

  await user.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
} catch (error) {
  console.log(error)
}
  
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
