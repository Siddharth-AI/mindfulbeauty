import Joi from 'joi';

export const createEmployeeSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'string.empty': 'Name is required',
      'any.required': 'Name is required',
    }),
  location: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Location must be at least 2 characters long',
      'string.max': 'Location cannot exceed 100 characters',
      'string.empty': 'Location is required',
      'any.required': 'Location is required',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    }),
  mobile_no: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Mobile number must be 10-15 digits',
      'string.empty': 'Mobile number is required',
      'any.required': 'Mobile number is required',
    }),
  role: Joi.string()
    .valid('salon', 'freelancer')
    .required()
    .messages({
      'any.only': 'Role must be either salon or freelancer',
      'any.required': 'Role is required',
    }),
});

export const updateEmployeeSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.uuid': 'Invalid employee ID format',
    'any.required': 'Employee ID is required',
  }),
  name: Joi.string().min(2).max(100).optional(),
  location: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  mobile_no: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
  role: Joi.string().valid('salon', 'freelancer').optional(),
}).min(2);

export const getEmployeeSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.uuid': 'Invalid employee ID format',
    'any.required': 'Employee ID is required',
  }),
});

export const deleteEmployeeSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.uuid': 'Invalid employee ID format',
    'any.required': 'Employee ID is required',
  }),
});