import Joi from 'joi';

export default {
  createBooking: Joi.object({
    showtimeId: Joi.number().required(),
    seats: Joi.array().min(1).max(6).required(),
  }),
}