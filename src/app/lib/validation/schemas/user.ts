import Joi from "joi"

export const userCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  type: Joi.string().valid("salon", "freelancer").required(),
  mobile_no: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  address: Joi.string().allow("").optional(),
  city: Joi.string().allow("").optional(),
  profile_image: Joi.string().uri().optional(),
  location: Joi.string().allow("").optional(),
  is_admin: Joi.boolean().optional(),
  // Remove status validation to allow all statuses
})

export const userEditSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).allow("").optional(),
  type: Joi.string().valid("salon", "freelancer").optional(),
  mobile_no: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
  address: Joi.string().allow("").optional(),
  city: Joi.string().allow("").optional(),
  profile_image: Joi.string().uri().optional(),
  location: Joi.string().allow("").optional(),
  is_admin: Joi.boolean().optional(),
  // Allow all status values including approved
  status: Joi.string().valid("pending", "approved", "active", "inactive", "suspended").optional(),
})

export const patchUserStatusSchema = Joi.object({
  new_status: Joi.string().valid("pending", "approved", "active", "inactive", "suspended").required(),
  remark: Joi.string().min(2).required(),
})
