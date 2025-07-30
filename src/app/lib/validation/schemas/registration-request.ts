import Joi from 'joi';

export const createRegistrationRequestSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  type: Joi.string().valid('salon', 'freelancer').required(),
  mobile_no: Joi.string().pattern(/^[0-9]{10,15}$/).allow('', null),
  location: Joi.string().allow('', null),
  remark: Joi.string().allow('', null),
});

export const updateRequestStatusSchema = Joi.object({
  new_status: Joi.string().valid('pending', 'approved', 'rejected', 'follow-up').required(),
  remark: Joi.string().min(2).required(), // Always require reason!
});
