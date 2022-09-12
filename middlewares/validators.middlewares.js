const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
		const errorMessages = errors.array().map(err => err.msg);

		const message = errorMessages.join('. ');

		return res.status(400).json({
			status: 'error',
			message,
		});
	}

	next();
};
const createUserValidations = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email')
	  .notEmpty()
	  .withMessage('Email cannot be empty')
	  .isEmail()
	  .withMessage('Must be a valid email'),
	body('password')
	  .notEmpty()
	  .withMessage('Password cannot be empty')
	  .isLength({ min: 8 })
	  .withMessage('Password must be at least 8 characters long'),
	checkValidations,
  ];
  
  const createTaskValidations = [
	body('title')
	  .notEmpty()
	  .withMessage('Title cannot be empty')
	  .isString()
	  .withMessage('Title must be a string'),
	body('userId')
	  .isNumeric()
	  .withMessage('User id must be a number')
	  .custom(val => val > 0)
	  .withMessage('User id cannot be a negative value'),
	checkValidations,
  ];
  
  module.exports = {
	createUserValidations,
	createTaskValidations,
  };
  