import {Op} from 'sequelize';
import HttpErrors from "http-errors";

import Films from '../models/Film.js';
import ShowTime from "../models/Showtime.js";
import Booking from '../models/booking.js';

const PAGE_SIZE = 10;

export default {
  async getFilms(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const search = req.query.search || '';

      const where = {};

      if (search) {
        where.title = {
          [Op.like]: `%${search}%`,
        };
      }

      const {count, rows} = await Films.findAndCountAll({
        where,
        limit: PAGE_SIZE,
        offset: (page -1) * PAGE_SIZE,
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
        films: rows,
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

  async getFilm(req, res, next) {
    try {
      const film = await Films.findByPk(req.params.id, {
        include: [
          {
            model: ShowTime,
            as: 'showtime',
          },
        ],
      });

      if (!film) {
        throw new HttpErrors(404, {
          errors: {
            message: 'Film not found',
          },
        });
      }

      res.json(film);
    } catch (e) {
      next(e);
    }
  },

  async createFilm(req, res, next) {
    try {
        const {title, description, genre, duration} = req.body;

        const film = await Films.create({
          title,
          description,
          genre,
          duration,
        });

        res.status(200).json({
          message: 'Film created successfully',
          film,
        });
    } catch (e) {
      next(e);
    }
  },

  async updateFilm(req, res, next){
    try {
        const film = await Films.findByPk(req.params.id,);

        if (!film) {
          throw new HttpErrors(404, {
            errors: {
              message: 'Film not found',
            },
          });
        }

        await film.update(req.body);

        res.status(200).json({
          message: 'Film updated successfully',
          film,
        });
    } catch (e) {
      next(e);
    }
  },

  async deleteFilm(req, res, next) {
    try {
        const film = await Films.findByPk(req.params.id,);

        if (!film) {
          throw new HttpErrors(404, {
            errors: {
              message: 'Film not found',
            },
          });
        }

        const showTimes = await ShowTime.findAll({
          where: {
            filmId: film.id,
          },
        });

        const showTimesId = showTimes.map((showTime) => showTime.id);

        const bookingCount = await Booking.count({
          where: {
            showTimeId: showTimesId,
          },
        });

        if (bookingCount > 0) {
          throw new HttpErrors(400, {
            errors: {
              message: 'Film has reservations and cannot be deleted',
            },
          });
        }

        await film.destroy();

        res.status(200).json({
          message: 'Film deleted successfully',
        });
    } catch (e) {
      next(e);
    }
  }
}