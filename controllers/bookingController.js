import HttpErrors from "http-errors";
import {v4 as uuidV4} from 'uuid';

import Booking from "../models/booking.js";
import ShowTime from '../models/Showtime.js';
import Films from '../models/Film.js';

const PAGE_SIZE = 10;

export default {
  async createBooking(req, res, next) {
    try {
      const {showtimeId, seats} = req.body;

      console.log(req.body);
      const showTime = await ShowTime.findByPk(showtimeId);

      if (!showTime) {
        throw new HttpErrors(404, {
          errors: {
            message: 'ShowTime not found',
          },
        });
      }

      if (!Array.isArray(seats) || seats.length === 0) {
        throw new HttpErrors(400, {
          errors: {
            message: 'Choose at least one seat',
          },
        });
      }

      if (seats.length > 6) {
        throw new HttpErrors(400, {
          errors: {
            message: 'Maximum 6 hat',
          },
        });
      }

      const totalPrice = Number(showTime.price) * seats.length;

      const booking = await Booking.create({
        userId: req.session.user.id,
        showtimeId,
        seats: seats.join(','),
        totalPrice,
        bookingReferance: uuidV4(),
        bookingDate: new Date(),
        status: 'confirmed',
      });

      res.status(200).json({
        message: 'Booking created successfully.',
        booking,
      });
    } catch (e) {
      next(e);
    }
  },

  async getBookings(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;

      const {count, rows} = await Booking.findAndCountAll({
        where: {
          userId: req.session.user.id,
        },
        include: [
          {
            model: ShowTime,
            as: 'showtime',
            include: [
              {
                model: Films,
                as: 'film',
              },
            ],
          },
        ],
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        order: [['bookingDate', 'DESC']],
      });

      res.status(200).json({
        bookigs: rows,
        pagination: {
          page,
          totalPages: Math.ceil(count / PAGE_SIZE),
          totalResults: count,
        },
      });
    } catch (e) {
      next(e);
    }
  },

  async getBooking(req, res, next) {
    try {
      const booking = await Booking.findOne({
        where: {
          id: req.params.id,
          userId: req.session.user.id,
        },
        include: [
          {
            model: ShowTime,
            as: 'showtime',
            include: [
              {
                model: Films,
                as: 'film',
              },
            ],
          },
        ],
      });

      if (!booking) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Booking not found',
          },
        });
      }

      res.json(booking);
    } catch (e) {
      next(e);
    }
  },

  async cancelBooking(req, res, next) {
    try {
      const booking = await Booking.findOne({
        where: {
          id: req.params.id,
          userId: req.session.user.id,
        },
      });

      if (!booking) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Booking not found',
          },
        });
      }

      await booking.update({
        status: 'cancelled',
      });

      res.json({
        message: 'Booking cancelled',
      });
    } catch (e) {
      next(e);
    }
  }
};