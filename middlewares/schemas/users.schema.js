import Joi from 'joi';

export default {
  register: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
    fullName: Joi.string().required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
  }),

  resetPassword: Joi.object({
    oldPassword: Joi.string().min(6).max(32).required(),
    newPassword: Joi.string().min(6).max(32).required(),
  }),
}