import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  mobile_no: Joi.string().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().allow(null, ''),
  city: Joi.string().allow(null, ''),
  profile_image: Joi.string().uri().allow(null, ''), // optional image URL
  otp: Joi.string().length(6).allow(null, ''),
});

export const loginUserSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().min(6).required(),
});