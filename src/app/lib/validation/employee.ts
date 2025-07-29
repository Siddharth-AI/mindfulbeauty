// src/lib/validation/staff.ts

import Joi from 'joi';

// POST: Create employee
export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  location: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  mobile_no: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
  role: Joi.string().valid('salon', 'freelancer').required(),
});

// PATCH: Update employee
export const updateEmployeeSchema = Joi.object({
  id: Joi.alternatives(Joi.string(), Joi.number()).required(),
  name: Joi.string().min(2),
  location: Joi.string().min(2),
  email: Joi.string().email(),
  mobile_no: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
});

// DELETE: Soft-delete employee by query param
export const deleteEmployeeQuerySchema = Joi.object({
  id: Joi.alternatives(Joi.string(), Joi.number()).required(),
});
