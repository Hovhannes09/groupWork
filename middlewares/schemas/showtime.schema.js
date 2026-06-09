import Joi from 'joi';

export default {
  createShowtime: Joi.object({
    filmId: Joi.number().required(),
    showDate: Joi.date().required(),
    showTime: Joi.string().required(),
    price: Joi.number().positive().required(),
    totalSeats: Joi.number().integer().min(1).required(),
  }),
}