import Joi from 'joi';

export const userCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  type: Joi.string().valid('salon', 'freelancer').required(),
  mobile_no: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  address: Joi.string().allow(''),
  city: Joi.string().allow(''),
  profile_image: Joi.string().uri().optional(),
  location: Joi.string().allow(''),
  is_admin: Joi.boolean().optional(),
});

export const userEditSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  type: Joi.string().valid('salon', 'freelancer').optional(),
  mobile_no: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
  address: Joi.string().allow('').optional(),
  city: Joi.string().allow('').optional(),
  profile_image: Joi.string().uri().optional(),
  location: Joi.string().allow('').optional(),
  is_admin: Joi.boolean().optional(),
});


export const patchUserStatusSchema = Joi.object({
  new_status: Joi.string().valid('active', 'inactive').required(),
  remark: Joi.string().min(2).required(),
});