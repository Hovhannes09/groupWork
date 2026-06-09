import Joi from 'joi';

export default {
  createComment: Joi.object({
    filmId: Joi.number().required(),
    rating: Joi.number().min(1).max(5).required(),
    commentText: Joi.string().max(500).required(),
  }),

  updatedComment: Joi.object({
    filmId: Joi.number().required(),
    rating: Joi.number().min(1).max(5).required(),
    commentText: Joi.string().max(500).required(),
  }),
}