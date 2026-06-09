import Joi from 'joi';

export default {
  createFilm: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    genre: Joi.string().required(),
    duration: Joi.string().required(),
  }),

  updateFilm: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    genre: Joi.string().required(),
    duration: Joi.string().required(),
  }),


}